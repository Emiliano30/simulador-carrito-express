const {Router} = require('express');
const {
    getProducts, 
    addProduct, 
    deleteProduct, 
    updateProduct,
    renderProducts,
    renderProductDetail,
    renderCart,
    deleteCart,
    addToCart,
    renderCurrentCart,
    deleteProductFromCart
} = require('../controllers/view.controller');

const {validateProduct, validateId, validateUpdateProduct} = require('../middlewares/middleware')
const {upload} = require('../config/multer');

const router = new Router();

router.get('/', getProducts);

//Formulario ( home ) Segunda Entrega
router.post('/add-product', upload.single('thumbnail'),validateProduct, addProduct);
router.post('/delete-product/:id',validateId('id'), deleteProduct);
router.post('/update-product/:id', validateId('id'), validateUpdateProduct, updateProduct);

//version socket.io
router.get('/realtimeproducts', (req,res) => {
    res.render('pages/realTimeProducts',{version:'Socket.io'});
})

//Entrega Final
router.get('/products',renderProducts);
router.get('/products/:pid',validateId('pid'),renderProductDetail);
router.post('/products/:pid/add-to-cart',validateId('pid'),addToCart)
router.get('/carts/:cid',validateId('cid'),renderCart);
router.get('/cart',renderCurrentCart)
router.post('/carts/:cid/clear',validateId('cid'),deleteCart);
router.post('/cart/products/:pid/delete',validateId('pid'),deleteProductFromCart)

module.exports = {viewsRouter: router};