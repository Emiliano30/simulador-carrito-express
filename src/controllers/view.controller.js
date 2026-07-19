const {productManager} = require('../managers/ProductManager');
const {cartManager} = require('../managers/CartManager')
const { createProductFromRequest } = require('../services/productService');
const { buildPaginationLinks } = require('../utils/paginationLinks');

async function getProducts(req, res) {

    try {
        const products = await productManager.getProducts();
        const errorMsg = req.query.error || null;
        if(errorMsg){
            return res.status(400).render('pages/home',{
                products,
                error:errorMsg
            })
        }

        res.render('pages/home', { products });
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ error: error.message });
    }
}

async function addProduct(req, res) {
    try {
        await createProductFromRequest(req);
        return res.redirect('/');
    } catch (error) {
        console.error('Error al agregar el producto:', error);
        res.status(500).json({ error: error.message });
    }
}

async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        await productManager.deleteProduct(id);
        return res.redirect('/');
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ error: error.message });
    }
}

async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        await productManager.updateProduct(id, updatedData);
        return res.redirect('/');
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ error: error.message });
    }
}

async function deleteCart(req,res){
    try {
        const {cid} = req.params;
        await cartManager.clearCart(cid)
        return res.redirect(`/carts/${cid}`)
    } catch (error) {
        if(error.message === 'Carrito no encontrado'){
            return res.status(404).render('pages/error', {
                message:error.message
            })
        }

        res.status(500).json({
            error:error.message
        })
    }
}

async function addToCart(req,res){
    try {
        let cid = req.cookies.cid;
        if(!cid){
            const newCart = await cartManager.addCart();
            cid = newCart._id;
            res.cookie(
                'cid',
                cid,
                {
                    maxAge:1000*60*60*24*7
                });
        };

        await cartManager.addProductToCart(cid,req.params.pid);
        return res.redirect('/products')
    } catch (error) {
        if(error.message === 'Carrito no encontrado'){
            return res.status(404).render('pages/error', {
                message:error.message
            })
        }

        if(error.message === 'Producto no encontrado'){
            return res.status(404).render('pages/error', {
                message:error.message
            })
        }

        res.status(500).json({
            error:error.message
        })
    }
}

async function renderProducts(req,res){
    try {
        const {limit,page,category,status,sort} = req.query;
        
        const products = await productManager.getProducts(
            limit,
            page,
            category,
            status,
            sort
        )
        const {prevLink, nextLink} = buildPaginationLinks(
            '/products',
            products,
            req.query
        )
        res.render('pages/products',{
            products:products.docs,
            page:products.page,
            totalPages:products.totalPages,
            hasPrevPage: products.hasPrevPage,
            hasNextPage:products.hasNextPage,
            prevLink,
            nextLink,
            category,
            status,
            sort,
            limit
        });
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ error: error.message });
    }
};


async function renderProductDetail(req,res){
    try {
        const product = await productManager.getProductById(req.params.pid);
        return res.status(200).render('pages/product',{product})
    } catch (error) {
        if(error.message === 'Producto no encontrado'){
            return res.status(404).render('pages/error', {
                message:error.message
            })
        }

        res.status(500).json({
            error:error.message
        })
    }
};

async function renderCurrentCart(req,res){
    const cid = req.cookies.cid;
    if(!cid){
        return res.render('pages/error',{
            message:'Todavia no tiene un carrito'
        })
    }

    return res.redirect(`/carts/${cid}`)
}

async function renderCart(req,res){
    try {
        const {cid} = req.params;

        const cart = await cartManager.getCartById(cid);
   
        const total = cart.products.reduce((acc,item)=> {
            return acc + (item.product.price * item.quantity)
        },0);

        return res.status(200).render('pages/cart',{cart,total})
    } catch (error) {
        if(error.message === 'Carrito no encontrado'){
            return res.status(404).render('pages/error', {
                message:error.message
            })
        }

        res.status(500).json({
            error:error.message
        })
    }
};

async function deleteProductFromCart(req,res){
    try {
        const cid = req.cookies.cid;

        if(!cid){
            return res.status(400).render('pages/error',{
                message: 'No existe un carrito activo'
            })
        }
        await cartManager.deleteProductFromCart(cid,req.params.pid);
        return res.redirect(`/carts/${cid}`)
    } catch (error) {
        if(error.message === 'Carrito no encontrado'){
            return res.status(404).render('pages/error', {
                message:error.message
            })
        }

        if(error.message === 'El producto no existe en el carrito'){
            return res.status(404).render('pages/error',{
                message:error.message
            })
        }

        res.status(500).json({
            error:error.message
        })
    }
}

module.exports = {
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
};