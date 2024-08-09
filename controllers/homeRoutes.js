// will hold Routes for rendering pages (e.g., homepage, dashboard)

const router = require('express').Router();
const { Entry, User } = require('../models');

// router for rendering the home page 
router.get('/', async (req, res) => {
    try {
        const entries = await Entry.findAll({
            // optionally include user data if needed - need to decide on this for sure
            include: [ { model: User }],
        });
        const serializedEntries = entries.map((entry) => entry.get({ plain: true }));

        res.render('home', {
            title: 'Home Page',
            entries: serializedEntries
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// route to render about page, if we decide to make one
router.get('/about', (req, res) => {
    res.render('about', { title: 'About Page' });
});

module.exports = router;