const {Users} = require('../models/users');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {

    try {
        const user = new Users({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        const results = await user.save();
        res.send(results);
    }catch (e) {
        res.send(e.message);
    }
});

router.get('/', async (req, res) => {

    try {
       const users = await Users.find().sort('name').populate({name:1, email: 1});
        res.send(users);
    }catch (e) {
        res.send(e.message);
    }
});

module.exports.router = router;