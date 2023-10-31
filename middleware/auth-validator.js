const jwt = require('jsonwebtoken');
require("dotenv").config();

function authenticateToken(req, res, next) {
    const token = req.header('Bearer');

    if (!token) return res.status(401).json({ code: 401, message: 'Access denied. No token provided.' });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.status(400).json({ code: 400, message: 'Invalid token.' });

        req.user = user;
        next();
    });
}

module.exports = { authenticateToken };
