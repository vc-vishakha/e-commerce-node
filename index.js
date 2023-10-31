const express = require('express');
const app = express();
// const bodyParser = require('body-parser')
const { engine } = require('express-handlebars');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const initiateMongoServer = require("./config/db");
const router = require('./routes/index');

initiateMongoServer();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure Express Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Set views directory
app.set('views', path.join(__dirname, 'templates', 'emails'));

app.get('/health', async (req, res) => {
    try {
        const healthcheck = {
            uptime: process.uptime(),
            message: 'OK',
            timestamp: Date.now()
        };
        // Render email template
        const html = await res.render('welcome', { healthcheck });

        // Send email using Nodemailer
        // (Nodemailer setup will be covered in the next section)
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Internal Server Error');
    }
});

// routes
app.use(router);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});