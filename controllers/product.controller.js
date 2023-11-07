const Product = require("../schema/product.schema");


exports.createProduct = async function createProduct(req, res) {
    try {
        const prod = new Product(req.body);

        await prod.save();
        res.status(200).send({
            message: "Product created successfully!",
        });
    } catch (error) {
        res.status(400).send({
            message: "Bad request",
            error: [error],
        });
    }
};

exports.updateProduct = async function updateProduct(req, res) {
    try {
        await Product.updateOne({ _id: req.body.id }, req.body);
        res.status(200).send({
            message: "Product updated successfully!"
        });
    } catch (error) {
        res.status(400).send({
            message: "Bad request",
            error: [error],
        });
    }
};

exports.deleteProduct = async function deleteProduct(req, res) {
    try {
        await Product.findOneAndDelete({ _id: req.params.id });
        res.status(200).send({
            message: "Product deleted successfully!"
        });
    } catch (error) {
        res.status(400).send({
            message: "Bad request",
            error: [error],
        });
    }
};

exports.getProductList = async function getProduct(req, res) {
    try {
        const productList = await Product.find();
        res.status(200).send({
            message: "Product list get successfully!",
            data: productList,
        });
    } catch (error) {
        res.status(400).send({
            message: "Bad request",
            error: [error],
        });
    }
};
