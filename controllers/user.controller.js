const User = require("../schema/user.schema");


exports.createUser = async function createUser(req, res) {
    try {
        const user = new User(req.body);

        await user.save();
        res.status(200).send({
            message: "User created successfully!",
        });
    } catch (error) {
        res.status(400).send({
            message: "Bad request",
            error: [error],
        });
    }
};

exports.updateUser = async function updateUser(req, res) {
    try {
        await User.updateOne({ _id: req.body.id }, req.body);
        res.status(200).send({
            message: "User updated successfully!"
        });
    } catch (error) {
        res.status(400).send({
            message: "Bad request",
            error: [error],
        });
    }
};

exports.deleteUser = async function deleteUser(req, res) {
    try {
        await User.findOneAndDelete({ _id: req.params.id });
        res.status(200).send({
            message: "User deleted successfully!"
        });
    } catch (error) {
        res.status(400).send({
            message: "Bad request",
            error: [error],
        });
    }
};

exports.getUserList = async function getUser(req, res) {
    try {
        const userList = await User.find();
        res.status(200).send({
            message: "User list get successfully!",
            data: userList,
        });
    } catch (error) {
        res.status(400).send({
            message: "Bad request",
            error: [error],
        });
    }
};
