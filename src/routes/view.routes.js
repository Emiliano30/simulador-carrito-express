const {Router} = require('express');
const {getProducts, addProduct, deleteProduct, updateProduct} = require('../controllers/view.controller');
const {validateProduct, validateId, validateUpdateProduct} = require('../middlewares/middleware')
const {upload} = require('../config/multer');

const router = new Router();

router.get('/', getProducts);

router.post('/add-product', upload.single('thumbnail'),validateProduct, addProduct);

router.post('/delete-product/:id',validateId('id'), deleteProduct);

router.post('/update-product/:id', validateId('id'), validateUpdateProduct, updateProduct);

//version socket.io

router.get('/live', (req,res) => {
    res.render('pages/realTimeProducts',{version:'Socket.io'});
})

module.exports = {viewsRouter: router};