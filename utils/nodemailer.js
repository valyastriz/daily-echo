const nodemailer = require('nodemailer');

console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com', // SMTP server for Outlook
    port: 587, // Port for TLS/STARTTLS
    secure: false, // Use TLS
    auth: {
        // user: process.env.EMAIL_USER, 
        // pass: process.env.EMAIL_PASS 
        user: 'dailyechoecho@gmail.com', 
        pass: 'sfadwtrmoisxkkqe' 
    }
    // ,
    // tls: {
    //     ciphers: 'SSLv3'
    // },
    // logger: true,
    // debug: true 
});

const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;
