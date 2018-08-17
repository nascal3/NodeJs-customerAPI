const auth = require('../middleware/auth');
const {Customer} = require('../models/customers');
const express = require('express');
const router = express.Router();

// GET ALL CUSTOMERS
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find().sort({name:1});
        res.send(customers);
    }catch (e) {
        res.send(e.message);
    }
});

// GET A SINGLE CUSTOMER
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
       const customer = await Customer.findById(id);
       if (!customer) return res.status(404).send('Customer not found');

       res.send(customer);
    }catch (e) {
        res.send(e.message);
    }
});

// CREATE NEW CUSTOMER
router.post('/', auth, async (req, res) => {
    try {
        const customer = new Customer({
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        });

        const results = await customer.save();
        res.send(results);
    }catch (e) {
        res.send(e.message);
    }
});

// UPDATE CUSTOMER DETAILS
router.post('/:id', auth, async (req, res) => {
    const id = req.params.id;

    try {
        let customerDetails = await Customer.findById(id);
        if (!customerDetails) return res.status(404).send('Customer not found');

        customerDetails.set({
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        });

        const results = await customerDetails.save();
        res.send(results);
    }catch (e) {
        res.send(e.message);
    }
});

//  DELETE CUSTOMER
router.delete('/:id', auth, async (req, res) => {
    const id = req.params.id;

    try {
      const customer = Customer.findById(id);
      if (!customer) return res.status(404).send('Customer not found');

      const results = await customer.remove();
      res.send(results);
    }catch (e) {
        res.send(e.message);
    }
});

module.exports = router;