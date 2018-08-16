const mongoose = require('mongoose');

const usersCchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 30,
        minLength: 3,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        maxLength: 30,
        minLength: 3,
        required: true,
        trim: true
    },
    password: {
        maxLength: 30,
        minLength: 3,
        required: true,
        trim: true
    }
});

const Users = mongoose.model('users', usersCchema);

module.exports.Users = Users;