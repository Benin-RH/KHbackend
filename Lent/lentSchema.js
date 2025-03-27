const mongoose = require("mongoose");
const lentBookSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
    unique: true, 
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  }
});
module.exports = mongoose.model("lentedBook", lentBookSchema);
