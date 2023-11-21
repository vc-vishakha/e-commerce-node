const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: true
    },
    verificationCode: {
        type: String,
        required: false
    },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
