const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact')

router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();

        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const contact = new Contact(req.body);
    try{
        const newContact = await contact.save();
        res.status(201).json(newContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!updatedContact) return res.status(404).json({ message:'Contact not found'});
        res.json(updatedContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) return res.status(404).json({ message: 'Contact not found' });
        res.json({ message: 'Contact deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
  });
  

module.exports = router;