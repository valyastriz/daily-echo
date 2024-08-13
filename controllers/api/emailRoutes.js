const express = require('express');
const router = express.Router();
const sendEmail = require('../../utils/nodemailer');
const { Entry } = require('../../models');

router.post('/email-entry/:id', async (req, res) => {
    try {
        const entry = await Entry.findByPk(req.params.id);

        if (!entry) {
            return res.status(404).json({ message: 'Entry not found' });
        }

        const userEmail = req.session.user.email; 
        const subject = `Your Daily Echo Entry: ${entry.title}`;
        const text = `Title: ${entry.title}\nMood: ${entry.mood}\nContent: ${entry.content}`;

        await sendEmail(userEmail, subject, text);

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send email' });
    }
});

module.exports = router;