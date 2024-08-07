// will hold Routes for diary entry-related API calls

const express = require('express');
const router = express.Router();


router.get('/entries', (req, res) => {
  res.send('Welcome to your diary!');
});


router.get('/login', (req, res) => {
  res.send('Thank you for coming back!');
});


router.get('/contact', (req, res) => {
  res.send('Contact page??');
});

module.exports = router;



