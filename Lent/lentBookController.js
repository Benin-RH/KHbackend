const LentBook = require("./lentSchema.js");
const Book = require("../Book/bookSchema.js");
const Staff = require("../Staff/staffschema.js");
const Student = require("../Student/studentSchema.js");
const mongoose = require("mongoose");

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

    // Mark the book as borrowed
    book.borrowed = true;
    await book.save();

    if (userType === "staff") {
      const findStaff = await Staff.findById(userId);
      if (!findStaff) {
        return res.status(404).json({ message: "User not found." });
      }
    } else if (userType === "student") {
      const findStudent = await Student.findById(userId);
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
    const lentBook = await LentBook.findOne({ bookId, userId });

    if (!lentBook) {
      return res
        .status(404)
        .json({ message: "No such lent book record found." });
    }

    if (lendBook) {
      const book = await Book.findById(lentBook.bookId);
      book.borrowed = false;
      await book.save();
    }
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

const getLentedBookByUser = async (req, res) => {
  try {
    let { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const lentedBook = await LentBook.find({ userId });

    if (!lentedBook.length) {
      return res
        .status(404)
        .json({ message: "No lented books found for this user" });
    }

    res.status(200).json({ book: lentedBook });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  lendBook,
  returnBook,
  getAllLentBooks,
  getLentedBookByUser,
};
