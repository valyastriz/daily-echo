// will hold Routes for diary entry-related API calls

const express = require('express');
const router = express.Router();
const { Entry } = require('../../models');

// get all diary entries
router.get('/', async (req, res) => {
    try {
        const entries = await Entry.findAll();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get single diary entry
router.get('/api/entries/:id', (req, res) => {

});

// create a new entry
router.post('/api/entries', (req, res) => {

});

// update an entry
router.put('api/entries/:id', (req, res) => {

});

// delete an entry
router.delete('/api/entries/:id', (req, res) => {

});

module.exports = router;



