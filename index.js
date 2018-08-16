const express = require('express');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const genres = require('./routes/genres');
const users = require('./routes/users');
const auth = require('./routes/auth');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connection to DB established...'))
    .catch(err => console.log(err.message));

app.use(express.json());
app.use('/api/customers', customers);
app.use('/api/genres', genres);
app.use('/api/movies', movies);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = 3000;
app.listen( port, () => console.log(`express running on port ${port}...`));