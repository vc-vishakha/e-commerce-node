const nodemailer = require('nodemailer');

// initialize nodemailer
exports.transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: process.env.MAILER_EMAIL,
            pass: process.env.MAILER_PASS
        }
    }
);
