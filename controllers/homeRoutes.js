// will hold Routes for rendering pages (e.g., homepage, dashboard)

const router = require('express').Router();
const { Entry, User } = require('../models');

//Have to think about where to put this! 
app.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' });
  });
  
  app.get('/about', (req, res) => {
    res.render('about', { title: 'About Page' });
  });
  
  app.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign Up' });
  });
  //Through here

