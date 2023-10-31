
const Joi = require('joi');
const { apiResponse } = require('../middleware/response-handler.middleware');

const nameMessages = {
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least {#limit} characters",
    "string.max": "Name must not exceed {#limit} characters",
    "any.required": "Name is required",
};

const emailMessages = {
    "string.base": "Email must be a string",
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
    "any.required": "Email is required",
};

const phoneMessages = {
    "string.base": "Phone number must be a string",
    "string.empty": "Phone number is required",
    "string.min": "Phone number must be at least {#limit} characters",
    "string.max": "Phone number must not exceed {#limit} characters",
    "any.required": "Phone number is required",
};

const ageMessages = {
    "number.base": "Age must be a number",
    "number.integer": "Age must be an integer",
    "number.min": "Age must be at least {#limit}",
    "number.max": "Age must not exceed {#limit}",
};

//User-defined function to validate the user
function validateUser(req, res, next) {
    const JoiSchema = Joi.object({

        name: Joi.string()
            .min(5)
            .max(30)
            .required().messages(nameMessages),

        email: Joi.string()
            .email()
            .min(5)
            .max(50)
            .required().messages(emailMessages),

        phone: Joi.string()
            .min(10)
            .max(14)
            .required().messages(phoneMessages),

        age: Joi.number()
            .min(18)
            .max(50)
            .optional().messages(ageMessages)

    });

    const { error, value } = JoiSchema.validate(req.body);

    if (error) {
        apiResponse(res, 400, error?.details[0]?.message, [], error?.details);
    } else {
        next();
    }
}

module.exports = { validateUser };