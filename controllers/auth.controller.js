const { transporter } = require("../helpers/mailer");
const User = require("../schema/user.schema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.loginUser = async function login(req, res) {
    try {
        let userData = await User.findOne({
            email: req.body.email,
            password: req.body.password,
        });
        if (!userData) {
            throw err;
        }
        if (!userData.isVerified) {
            return res.status(401).send({
                message: "Bad request",
                error: [{
                    message: "Please verify your account to use further.",
                }],
            });
        }
        const payload = {
            id: userData._id,
            name: userData.name,
            email: userData.email
        };
        jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            { expiresIn: 3600 * 24 },
            (err, token) => {
                if (err) {
                    throw err;
                }
                res.status(200).send({
                    message: "User logged in successfully",
                    token: token,
                });
            }
        );
    } catch (error) {
        res.status(400).send({
            message: "Please enter valid email or password",
            error: [error],
        });
    }
};

exports.registerUser = async function login(req, res) {
    try {
        let existingUser = await User.findOne({
            email: req.body.email,
        });
        if (existingUser) {
            return res.status(400).send({
                message: "Bad request",
                error: [{
                    message: "User already exists",
                }],
            });
        }
        const verificationCode = Math.random().toString(36).slice(2); // random string for verification code
        const user = new User({ ...req.body, isVerified: false, verificationCode });

        await user.save();

        const mailOptions = {
            from: `"My Company" <${process.env.MAILER_EMAIL}>`, // sender address
            template: "email", // the name of the template file, i.e., email.handlebars
            to: user.email,
            subject: `Welcome to My Company, ${user.name}`,
            context: {
                name: user.name,
                company: 'my company',
                link: `http://localhost:4300/verify/${user._id}`
            },
            html: `
            <h1>Dear ${user.name}, Welcome to My Company </h1>
            <p>We are glad to have you on board!</p>
            <p>Click here to verify your account <a href="http://localhost:4300/verify/${verificationCode}">Click</a></p>`
        };
        try {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    //Handle error here
                    res.status(400).send({
                        message: "Error while registering user",
                        error: [error],
                    });
                } else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).send({
                        message: "Thanks for registering! Please confirm your email! We have sent a link!"
                    })
                }
            });
        } catch (error) {
            console.log(`Nodemailer error sending email to ${user.email}`, error);
        }
    } catch (error) {
        res.status(400).send({
            message: "Bad request",
            error: [error],
        });
    }
};

exports.verifyUser = async function login(req, res) {
    try {
        const { verificationCode } = req.params;

        const user = await User.findOne({ verificationCode });

        if (!user) {
            return res.status(404).send({
                message: "User not found or Token invalid",
                error: [{
                    message: "Invalid verification code",
                }],
            });
        }

        user.isVerified = true;
        user.verificationCode = null;
        await user.save();
        res.status(200).send({
            message: "Account verified successfully!"
        })
    } catch (error) {
        res.status(400).send({
            message: "Bad request",
            error: [error],
        });
    }
};