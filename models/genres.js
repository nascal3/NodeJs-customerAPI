const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 5,
        maxLength: 30,
        required: true,
        trim: true
    }
});

const Genres = mongoose.model('genre', genreSchema);

exports.Genres = Genres;



