const {Router} = require('express');
const {getProducts, getProductById, addProduct, updateProduct, deleteProduct} = require('../controllers/product.controller');
const {validateProduct, validateId, validateUpdateProduct} = require('../middlewares/middleware');

const router = new Router();

router.get('/products', getProducts);

router.get('/products/:id', validateId('id'), getProductById);

router.post('/products', validateProduct, addProduct);

router.put('/products/:id', validateId('id'), validateUpdateProduct, updateProduct);

router.delete('/products/:id', validateId('id'), deleteProduct);

    

module.exports = {productRouter: router};