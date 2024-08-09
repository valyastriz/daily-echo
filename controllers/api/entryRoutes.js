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
router.post('/', async (req, res) => {
    try {
        const newEntry = await Entry.create({
            title: req.body.title,
            content: req.body.content,
            mood: req.body.mood,
            tags: req.body.tags,
            // user_id: req.session.user_id, 
        });

        res.status(201).json(newEntry);
    } catch (err) {
       res.status(500).json(err); 
    }
});

// update an entry
router.put('/:id', async (req, res) => {
    try {
        const updatedEntry = await Entry.update(req.body, {
            where: { id: req.params.id },
        });

        if (updatedEntry[0] === 0) {
            return res.status(404).json({ message: 'No entry found wit this id'});
        }

        res.status(200).json({ message: 'Entry updated successfully' });
    } catch (err) {
        console.error('Error updating entry:', err);
        res.status(500).json(err);
    }
});

// delete an entry
router.delete('/:id', async (req, res) => {
    try {
        const deletedRows = await Entry.destroy({
            where: { id: req.params.id },
        });

        if (!deletedRows) {
            return res.status(404).json({ message: 'No entry found with that id'});
        }

        res.status(200).json({ message: 'Entry successfully deleted '});
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;



