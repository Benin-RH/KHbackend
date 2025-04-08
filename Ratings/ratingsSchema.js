const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book', // Assuming you have a 'Book' model
        required: true
    },
    totalUsers: {
        type: Number,
        default: 0,
        min: 0
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

module.exports = mongoose.model('Ratings', ratingSchema);
