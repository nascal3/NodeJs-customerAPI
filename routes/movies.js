const {Movies} = require('../models/movies');
const {Genres} = require('../models/genres');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const movies = await Movies.find().sort('name');
        res.send(movies);
    }catch (e) {
        res.send(e.message);
    }
});

router.post('/', async (req, res) => {
    try {
       const genre = await Genres.findById(req.body.genre);
       if (!genre) return res.status(404).send('genre to be added on movie not found!');

        const movies = new Movies({
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        });

        const results = await movies.save();
        res.send(results);

    }catch (e) {
       res.send(e.message);
    }
});



module.exports = router;