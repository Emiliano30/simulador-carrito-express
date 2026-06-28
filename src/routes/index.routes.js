const {Router} = require('express');
const {cartRouter} = require('./cart.routes');
const {productRouter} = require('./product.routes');


const router = new Router();

router.use(productRouter);
router.use(cartRouter);


module.exports = {router};