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
        const user = new User(req.body);

        await user.save();

        const mailOptions = {
            from: '"My Company" <vishakha.tak@ics-global.in>', // sender address
            template: "email", // the name of the template file, i.e., email.handlebars
            to: user.email,
            subject: `Welcome to My Company, ${user.name}`,
            context: {
                name: user.name,
                company: 'my company',
                link: `http://localhost:4300/verify/${user._id}`
            },
            html: `<p>Click here to verify <a href="http://localhost:4300/verify/${user._id}">Click</a></p>`
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