const {genreSchema} = require('./genres');
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
        trim: true
    },
    numberInStock: {
        type: Number,
        default: 0,
        min: 0,
        max: 20
    },
    dailyRentalRate: {
        type: Number,
        default: 0,
        min: 0,
        max: 20
    },
    genre: {
        type: genreSchema,
        required: true,
    }

});

const Movies = mongoose.model('movies', movieSchema);


module.exports.Movies = Movies;