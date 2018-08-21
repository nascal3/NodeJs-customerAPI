const express = require('express');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const genres = require('../routes/genres');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/customers', customers);
    app.use('/api/genres', genres);
    app.use('/api/movies', movies);
    app.use('/api/users', users);
    app.use('/api/auth', auth);

    //error middleware
    app.use(error);
}