// will hold Routes for rendering pages (e.g., homepage, dashboard)


const router = require('express').Router();
const { Entry, User } = require('../models');

// router for rendering the home page 
router.get('/', async (req, res) => {
    try {
        console.log("Route accessed");
        let entries = [];

        if (req.session.logged_in) {
            entries = await Entry.findAll({
                where: {
                    user_id: req.session.user_id
                },
                include: [ { model: User, attributes: ['name' ] }],
            });
            console.log(entries);
        }

        const serializedEntries = entries.map((entry) => entry.get({ plain: true }));

        res.render('home', {
            title: 'Home Page',
            entries: serializedEntries,
            logged_in: req.session.logged_in,
            user: req.session.user || null
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// route to render signup page 
router.get('/signup', (req, res) => {
    console.log('Signup route access');
    res.render('signup', {
        title: 'Sign Up',
    });
});

// route to handle rendering login page
router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login'
    });
});

// route to render about page, if we decide to make one
router.get('/about', (req, res) => {
    res.render('about', { title: 'About Page' });
});

// route to handle rendering the newEntry page
router.get('/new-entry', (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
        return;
    }

    res.render('newEntry', {
        title: 'New Entry',
        logged_in: req.session.logged_in,
        user: req.session.user || null
    });
});

module.exports = router;