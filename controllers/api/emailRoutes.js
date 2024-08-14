const express = require('express');
const router = express.Router();
const { Entry } = require('../../models');
const sendEmail = require('../../utils/nodemailer');

router.post('/entries/:id/send-email', async (req, res) => {
    try {
        const entry = await Entry.findByPk(req.params.id);

        if (!entry) {
            res.status(404).json({ message: 'Entry not found' });
            return;
        }

        // Send the email
        const emailResult = await sendEmail(req.session.user.email, `Your Diary Entry: ${entry.title}`, entry.content);

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
