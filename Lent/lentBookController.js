const LentBook = require("./lentSchema.js");
const Book = require("../Book/bookSchema.js");
const Staff = require("../Staff/staffschema.js");
const student = require("../Student/studentSchema.js");

// Lend a Book
const lendBook = async (req, res) => {
  const { bookId, userId, userType } = req.body;
  try {
    const existingLentBook = await LentBook.findOne({ bookId });
    if (existingLentBook) {
      return res
        .status(400)
        .json({ message: "This book is already lent out." });
    }

    const existingUserLentBook = await LentBook.findOne({ userId });
    if (existingUserLentBook) {
      return res
        .status(400)
        .json({ message: "This user has already lent a book." });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    if (userType === "staff") {
      const findStaff = await Staff.findById(userId);
      if (!findStaff) {
        return res.status(404).json({ message: "User not found." });
      }
    } else if (userType === "student") {
      const findStudent = await student.findById(userId);
      if (!findStudent) {
        return res.status(404).json({ message: "User not found." });
      }
    }

    const lentedBook = new LentBook({
      bookId,
      userId,
    });

    await lentedBook.save();
    return res
      .status(201)
      .json({ message: "Book lent successfully!", lentedBook });
  } catch (error) {
    return res.status(500).json({ message: "Error lending book", error });
  }
};

// Return a Book
const returnBook = async (req, res) => {
  const { bookId, userId } = req.body;

  try {
    // Find the lent book record
    const lentBook = await LentBook.findOne({ bookId, userId });

    if (!lentBook) {
      return res
        .status(404)
        .json({ message: "No such lent book record found." });
    }

    // Remove the lent book record
    await LentBook.deleteOne({ _id: lentBook._id });
    return res.status(200).json({ message: "Book returned successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Error returning book", error });
  }
};

// Get All Lent Books
const getAllLentBooks = async (req, res) => {
  try {
    const lentBooks = await LentBook.find().populate("bookId userId");
    return res.status(200).json({ lentBooks });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching lent books", error });
  }
};

module.exports = {
  lendBook,
  returnBook,
  getAllLentBooks,
};
