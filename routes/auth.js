const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const {Users} = require('../models/users');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {

    try {
        let user = await Users.findOne({email: req.body.email});
        if (!user) return res.status(400).send('Invalid email or password');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Invalid email or password');

        const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'));
        res.send(token);
    }catch (e) {
        res.send(e.message);
    }
});

module.exports = router;