const router = require('express').Router();
const controller = require('../controllers/user.controller');

const userValidation = require("../validations/user.validate");

router.get('/', controller.getUserList);
router.post('/', userValidation.validateUser, controller.createUser);
router.patch('/', controller.updateUser);
router.delete('/:id', controller.deleteUser);

module.exports = router;