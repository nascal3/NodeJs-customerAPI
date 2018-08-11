const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

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


router.get('/', async (req, res) => {
    try {
        const genre = await Genres.find().sort({name:1});
        res.send(genre);
    }catch(e)
    {
        res.send(e.message);
    }

});

router.get('/:id',  async (req, res) => {

    const id = req.params.id;
    try {
        const result = await Genres.findById(id);
        if (!result) return res.status(404).send('genre not found');

        res.send(result);
    }catch (e) {
        res.send(e.message);
    }

});

router.post('/', async (req, res) => {

    const {error} = validateField(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const genre = new Genres({
        name: req.body.name
    });

    try {
        const result = await genre.save();
        res.send(result);
    }catch (e) {
        res.send(e.message);
    }

});

router.put('/:id', async (req, res) => {
    const {error} = validateField(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const id = req.params.id;
    const name = req.body.name;

    try {
        const genre = await Genres.findById(id);
        if (!genre) return;

        genre.set({
            name: name
        });

        const result = genre.save();
        res.send(result);
    }catch (e) {
        res.send(e.message);
    }

});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const result = await Genres.findByIdAndRemove(id);
        if (!result) return res.status(404).send('genre not found');

        res.send(result);
    } catch (e) {
        res.send(e.message);
    }
})

function validateField(name) {
    const schema = {
        name : Joi.string().min(3).required()
    };
    return Joi.validate(name, schema);
}

module.exports = router;