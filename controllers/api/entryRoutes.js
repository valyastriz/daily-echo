// will hold Routes for diary entry-related API calls

const express = require('express');
const router = express.Router();
const { Entry } = require('../../models');
// const withAuth = require('../../utils/auth');

// get all diary entries
// router.get('/', withAuth, async (req, res) => {
router.get('/', async (req, res) => {
    try {
        const entries = await Entry.findAll();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get single diary entry
router.get('/:id', async (req, res) => {
    try {
        const singleEntry = await Entry.findOne({
            where: {
                id: req.params.id,
                // user_id: req.session ? req.session.user_id : null,
            }
        });

        if (!singleEntry) {
            res.status(404).json({ message: 'No entry found with this id for the current user' });
            return;
        }

        res.status(200).json(singleEntry);
    }catch (err) {
        res.status(500).json(err);
    }
});

// create a new entry
router.post('/', (req, res) => {

});

// update an entry
router.put('/:id', (req, res) => {

});

// delete an entry
router.delete('/:id', (req, res) => {

});

module.exports = router;



