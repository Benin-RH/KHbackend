const fs = require("fs");
const path = require("path");
const multer = require("multer");
const Book = require("./bookSchema");

const createFolders = () => {
  const folders = ["uploads", "uploads/images", "uploads/pdfs"];
  folders.forEach((folder) => {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  });
};

createFolders();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadFolder = "./uploads";

    if (file.mimetype.startsWith("image/")) {
      uploadFolder = "./uploads/images";
    } else if (file.mimetype === "application/pdf") {
      uploadFolder = "./uploads/pdfs";
    }

    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage }).fields([
  { name: "imageFile", maxCount: 1 },
  { name: "bookFile", maxCount: 1 },
]);
/* const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max file size
}); */

const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find();
    if (!allBooks) {
      return res.status(400).json({
        message: "Books Not Found",
      });
    }
    return res.status(201).json({
      data: allBooks,
      message: "Book Fetched successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "servor error",
    });
  }
};

const addBook = async (req, res) => {
  try {
    if (!req.files || !req.files.imageFile || !req.files.bookFile) {
      return res
        .status(400)
        .json({ message: "Both image and book file are required!" });
    }

    const { bookName, authorName, description, category } = req.body;

    // Normalize paths to handle Windows backslashes
    const imageFullPath = path
      .normalize(req.files.imageFile[0].path)
      .replace(/\\/g, "/");
    const fileFullPath = path
      .normalize(req.files.bookFile[0].path)
      .replace(/\\/g, "/");

    // Extract only the original filename (removing timestamp)
    const imageName = path
      .basename(imageFullPath)
      .split("-")
      .slice(1)
      .join("-");
    const fileName = path.basename(fileFullPath).split("-").slice(1).join("-");

    // Escape special characters in filenames for regex search
    const escapedImageName = imageName.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    const escapedFileName = fileName.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

    // Check if a book already exists with the same bookName, imageName, or fileName
    const existingBook = await Book.findOne({
      $or: [
        { bookName },
        { imagePath: new RegExp(escapedImageName + "$", "i") },
        { filePath: new RegExp(escapedFileName + "$", "i") },
      ],
    });

    if (existingBook) {
      let duplicateField =
        existingBook.bookName === bookName
          ? "Book name"
          : existingBook.imagePath.includes(imageName)
          ? "Image file"
          : "PDF file";

      // Delete the newly uploaded files if they are duplicates
      if (fs.existsSync(imageFullPath)) fs.unlinkSync(imageFullPath);
      if (fs.existsSync(fileFullPath)) fs.unlinkSync(fileFullPath);

      return res.status(400).json({
        message: `${duplicateField} already exists! Please use a different one.`,
      });
    }

    // Save book details in MongoDB
    const newBook = new Book({
      bookName,
      authorName,
      description,
      category,
      imagePath: imageFullPath,
      filePath: fileFullPath,
    });

    const savedBook = await newBook.save();
    return res
      .status(201)
      .json({ message: "Book added successfully!", book: savedBook });
  } catch (error) {
    console.error("Error adding book:", error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getBook = (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      message: "id not found",
    });
  }
  Book.findById(id)
    .then((data) => {
      return res.status(201).json({
        data,
        message: "success",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        message: "Servor error",
      });
    });
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found!" });
    }

    if (fs.existsSync(book.imagePath)) {
      fs.unlinkSync(book.imagePath);
    }

    if (fs.existsSync(book.filePath)) {
      fs.unlinkSync(book.filePath);
    }

    await Book.findByIdAndDelete(id);

    return res.status(200).json({ message: "Book deleted successfully!" });
  } catch (error) {
    console.error("Error deleting book:", error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const editBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    console.log("Existing book:", book);
    console.log("Incoming updates:", req.body);
    console.log("Received files:", req.files);

    const updates = { ...req.body };

    // Handle Image Upload
    if (req.files?.image) {
      const newImagePath = req.files.image[0].path;

      // Delete old image if it exists
      if (book.imagePath) {
        fs.unlink(path.join(__dirname, "..", book.imagePath), (err) => {
          if (err) console.error("Error deleting old image:", err);
        });
      }

      updates.imagePath = newImagePath;
    }

    // Handle File Upload (PDF)
    if (req.files?.file) {
      const newFilePath = req.files.file[0].path;

      // Delete old file if it exists
      if (book.filePath) {
        fs.unlink(path.join(__dirname, "..", book.filePath), (err) => {
          if (err) console.error("Error deleting old file:", err);
        });
      }

      updates.filePath = newFilePath;
    }

    // Update book in the database
    const updatedBook = await Book.findByIdAndUpdate(bookId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return res.status(500).json({ message: "Failed to update book" });
    }

    res.status(200).json({
      message: "Book updated successfully",
      updatedBook,
    });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  upload,
  addBook,
  deleteBook,
  getAllBooks,
  getBook,
  editBook,
};
