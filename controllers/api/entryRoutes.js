// will hold Routes for diary entry-related API calls

const express = require('express');
const router = express.Router();
const { Entry } = require('../../models');
const withAuth = require('../../utils/auth');
const sendEmail = require('../../utils/nodemailer');

// get all diary entries
router.get('/', withAuth, async (req, res) => {
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
            user_id: req.session.user_id, 
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

//send email route
router.post('/:id/send-email', async (req, res) => {
    try {
        const entry = await Entry.findByPk(req.params.id);
        console.log(entry);
        if (!entry) {
            res.status(404).json({ message: 'Entry not found' });
            return;
        }

        console.log(`User email logs as: ${req.session.user.email}`);
        
        // Send the email
        const emailResult = await sendEmail(req.session.user.email, `Your Diary Entry: ${entry.title}`, entry.content);
        console.log(`Send email logs as: ${sendEmail}`);
        

        if (emailResult) {
            res.status(200).json({ message: 'Email sent successfully!' });
        } else {
            res.status(500).json({ message: 'Failed to send email.' });
        }
    } catch (error) {
        console.error('Error fetching entry:', error);
        res.status(500).json({ message: 'Failed to send email.' });
    }
});

module.exports = router;



