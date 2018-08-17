const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const usersSchema = new mongoose.Schema({
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
        type: String,
        maxLength: 1024,
        minLength: 3,
        required: true,
        trim: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

usersSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
};

const Users = mongoose.model('users', usersSchema);

module.exports.Users = Users;