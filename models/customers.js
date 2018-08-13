const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 30,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    isGold: {
        type: Boolean,
        default: false
    }
});

const Customer = mongoose.model('customers', customerSchema);

exports.Customer = Customer;