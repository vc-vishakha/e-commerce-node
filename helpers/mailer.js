const nodemailer = require('nodemailer');

// initialize nodemailer
exports.transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: 'vishakha.tak@ics-global.in',
            pass: 'XXX'
        }
    }
);
