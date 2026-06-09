const {Router} = require('express');
const {addCart, getCartById, addProductToCart} = require('../controllers/cart.controller');
const {validateId} = require('../middlewares/middleware');

const router = new Router();

router.post('/carts', addCart);

router.get('/carts/:id', validateId('id'), getCartById);

router.post('/carts/:cartId/products/:productId', validateId('cartId'), validateId('productId'), addProductToCart);


module.exports = {cartRouter: router};