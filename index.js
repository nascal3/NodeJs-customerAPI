const express = require('express');
const customers = require('./routes/customers.js');
// const genres = require('./routes/genres.js');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connection to DB established...'))
    .catch(err => console.log(err.message));

app.use(express.json());
app.use('api/customers', customers);
// app.use('api/genres', genres);



const port = 3000;
app.listen( port, () => console.log(`express running on port ${port}...`));