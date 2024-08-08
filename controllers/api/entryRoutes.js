// will hold Routes for diary entry-related API calls

const express = require('express');
const router = express.Router();

// get all diary entries
router.get('/entries', (req, res) => {

  
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



