const mongoose = require("mongoose");

const favSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'userType',
        required: true
    },
    userType: {
        type: String,
        required: true,
        enum: ['student', 'staff'] 
    },
    bookIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'books',
        required: true
    }]
});

module.exports = mongoose.model("favourites", favSchema);
