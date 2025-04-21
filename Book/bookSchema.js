const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    bookName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      collation: { locale: "en", strength: 2 },
    },
    authorName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Student", "Staff"],
      required: true,
    },
    imagePath: {
      type: String,
      required: true,
      unique: true, 
    },
    filePath: {
      type: String, 
      required: true,
      unique: true,
    },
    ratings: { type: Number, default: 0 },
    borrowed: { type: String, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("books", bookSchema);
