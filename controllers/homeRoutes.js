// will hold Routes for rendering pages (e.g., homepage, dashboard)


const router = require('express').Router();
const { Entry, User } = require('../models');

// router for rendering the home page 
router.get('/', async (req, res) => {
    try {
        let entries = [];

        if (req.session.logged_in) {
            entries = await Entry.findAll({
                where: {
                    user_id: req.session.user_id
                },
                include: [ { model: User, attributes: ['name' ] }],
            });
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


// route to render about page, if we decide to make one
router.get('/about', (req, res) => {
    res.render('about', { title: 'About Page' });
});

module.exports = router;