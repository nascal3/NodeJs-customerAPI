const validateObjectId = require('../middleware/validObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Genres} = require('../models/genres');
const Joi = require('joi');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res, next) => {
    const genre = await Genres.find().sort({name:1});
    res.send(genre);
});

router.get('/:id', validateObjectId, async (req, res) => {
    const id = req.params.id;

    const result = await Genres.findById(id);
    if (!result) return res.status(404).send('genre not found');

    res.send(result);
});

router.post('/', auth,async (req, res) => {

    const {error} = validateField(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const genre = new Genres({
        name: req.body.name
    });

    const result = await genre.save();
    res.send(result);
});

router.put('/:id', [auth, admin], async (req, res) => {
    const {error} = validateField(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const id = req.params.id;
    const name = req.body.name;

    const genre = await Genres.findById(id);
    if (!genre) return;

    genre.set({
        name: name
    });

    const result = genre.save();
    res.send(result);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const id = req.params.id;

    const result = await Genres.findByIdAndRemove(id);
    if (!result) return res.status(404).send('genre not found');

    res.send(result);
});

function validateField(name) {
    const schema = {
        name : Joi.string().min(3).max(50).required()
    };
    return Joi.validate(name, schema);
}

module.exports = router;