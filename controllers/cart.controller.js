const Cart = require("../schema/cart.schema");
const Product = require("../schema/product.schema");


exports.addProductToCart = async function addProductToCart(req, res) {
    try {
        const { productId, quantity } = req.body;
        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send({
                message: "Product not found",
                error: [error],
            });
        }

        let cartItem = await Cart.findOne({ productId });

        if (cartItem) {
            // Update quantity if the product is already in the cart
            cartItem.quantity += quantity;
        } else {
            // Add a new item to the cart if the product is not in the cart
            cartItem = new Cart({ productId, quantity });
        }

        await cartItem.save();
        res.status(200).send({
            message: "Product added to cart successfully!",
        });
    } catch (error) {
        res.status(400).send({
            message: "Bad request",
            error: [error],
        });
    }
};

exports.updateProductInCart = async function updateProductInCart(req, res) {
    try {

        const itemId = req.params.id;
        const { quantity, type } = req.body;

        const cartDetail = await Cart.findById({ _id: itemId });
        if (!cartDetail) {
            return res.status(404).send({
                message: "Product not found in cart",
                error: [error],
            });
        }
        // Update the quantity of the cart item
        let updatedQuantity;
        if (type == 'add') {
            updatedQuantity = cartDetail.quantity + quantity;
        } else {
            updatedQuantity = cartDetail.quantity - quantity;
        }
        if (updatedQuantity <= 0) {
            return res.status(404).send({
                message: "Atleast one quantity should be present",
                error: [error],
            });
        }
        await Cart.findByIdAndUpdate(itemId, { quantity: updatedQuantity });

        res.status(200).send({
            message: "Product updated in cart successfully!",
        });
    } catch (error) {
        res.status(400).send({
            message: "Bad request",
            error: [error],
        });
    }
};

exports.deleteProductFromCart = async function deleteProductFromCart(req, res) {
    try {
        await Cart.findOneAndDelete({ _id: req.params.id });
        res.status(200).send({
            message: "Product deleted from cart successfully!"
        });
    } catch (error) {
        res.status(400).send({
            message: "Bad request",
            error: [error],
        });
    }
};

exports.getCart = async function getCart(req, res) {
    try {
        const cartItems = await Cart.find();

        const productIds = cartItems.map(item => item.productId);

        const productsInCart = await Product.find({ _id: { $in: productIds } });

        // Combine product details with cart items
        const cartList = cartItems.map(item => {
            const product = productsInCart.find(p => p._id.equals(item.productId));
            return {
                productId: item.productId,
                quantity: item.quantity,
                id: item._id,
                productDetails: product
            };
        });
        res.status(200).send({
            message: "Cart list get successfully!",
            data: cartList,
        });
    } catch (error) {
        res.status(400).send({
            message: "Bad request",
            error: [error],
        });
    }
};


