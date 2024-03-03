const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId, // This indicates the field will store an ObjectId
        required: true,
        ref: 'User' // This tells Mongoose that this ObjectId references the User model
    },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    genre: {type: String, required: true }
});

module.exports = mongoose.model('Post', postSchema);