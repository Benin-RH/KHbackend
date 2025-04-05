const Rating = require("./ratingsSchema.js");
const mongoose = require("mongoose");
const Book = require("../Book/bookSchema.js");

// Create a new rating
const createRating = async (req, res) => {
  try {
    const { bookId, rating } = req.body;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: "Invalid bookId format" });
    }

    let existingRating = await Rating.findOne({ bookId });
    let book = await Book.findById(bookId);

    if (existingRating) {
      existingRating.totalUsers += 1;
      existingRating.rating =
        (existingRating.rating * (existingRating.totalUsers - 1) + rating) /
        existingRating.totalUsers;

      // Limit to 1 or 2 decimal places
      existingRating.rating = parseFloat(existingRating.rating.toFixed(1));

      await existingRating.save();
      book.ratings = existingRating.rating;
      await book.save();
      return res.status(200).json(existingRating);
    } else {
      const newRating = new Rating({
        bookId,
        totalUsers: 1,
        rating: parseFloat(rating.toFixed(2)),
      });

      book.ratings = parseFloat(rating.toFixed(2));
      await book.save();
      await newRating.save();
      return res.status(201).json(newRating);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Get all ratings
const getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.find().populate("bookId");
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get rating by book ID
const getRatedUsers = async (req, res) => {
  try {
    const { id } = req.params; // not bookId
    const ratings = await Rating.find({ bookId: id });
    res.status(200).json({ data: ratings }); // make sure it's an array
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// Update rating
const updateRating = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { rating } = req.body;

    let existingRating = await Rating.findOne({ bookId });

    if (!existingRating) {
      return res.status(404).json({ message: "Rating not found" });
    }

    existingRating.totalUsers += 1;
    existingRating.rating =
      (existingRating.rating * (existingRating.totalUsers - 1) + rating) /
      existingRating.totalUsers;

    await existingRating.save();
    res.status(200).json(existingRating);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete rating
const deleteRating = async (req, res) => {
  try {
    const { bookId } = req.params;
    const rating = await Rating.findOneAndDelete({ bookId });

    if (!rating) {
      return res.status(404).json({ message: "Rating not found" });
    }

    res.status(200).json({ message: "Rating deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  createRating,
  getRatedUsers
};
