const router = require('express').Router();
const controller = require('../controllers/product.controller');

// const productValidation = require("../validations/product.validate");

router.get('/list', controller.getProductList);
// router.post('/', userValidation.productValidation, controller.createProduct);
router.post('/create', controller.createProduct);
router.patch('/update', controller.updateProduct);
router.delete('/:id', controller.deleteProduct);

module.exports = router;