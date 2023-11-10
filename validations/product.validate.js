
const Joi = require('joi');
const { apiResponse } = require('../middleware/response-handler.middleware');

const nameMessages = {
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least {#limit} characters",
    "string.max": "Name must not exceed {#limit} characters",
    "any.required": "Name is required",
};

const descriptionMessages = {
    "string.base": "Description must be a string",
    "string.empty": "Description is required",
    "string.min": "Description must be at least {#limit} characters",
    "string.max": "Description must not exceed {#limit} characters",
    "any.required": "Description is required",
};

const priceMessages = {
    "number.base": "Price must be a number",
    "number.integer": "Price must be an integer",
    "number.min": "Price must be at least {#limit}",
    "number.max": "Price must not exceed {#limit}",
};

const imageMessages = {
    "string.base": "Product link must be a string",
    "string.empty": "Product link is required",
};

function validateProduct(req, res, next) {
    const imageValidate = Joi.object({
        link: Joi.string()
            .required().messages(imageMessages)
    });
    const JoiSchema = Joi.object({

        name: Joi.string()
            .min(5)
            .max(50)
            .required().messages(nameMessages),

        description: Joi.string()
            .min(5)
            .max(200)
            .required().messages(descriptionMessages),

        price: Joi.number()
            .min(100)
            .max(5000)
            .required().messages(priceMessages),

        images: Joi.array()
            .items(imageValidate)
            .min(1).required()

    });

    const { error, value } = JoiSchema.validate(req.body);

    if (error) {
        apiResponse(res, 400, error?.details[0]?.message, [], error?.details);
    } else {
        next();
    }
}

module.exports = { validateProduct };