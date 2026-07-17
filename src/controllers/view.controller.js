const {productManager} = require('../managers/ProductManager');
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
        return res.status(200).render('pages/product',{product:product.toObject()})
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


async function renderCart(res,res){
    res.send('vista carrito')
};

module.exports = {getProducts, addProduct, deleteProduct, updateProduct, renderProducts, renderProductDetail, renderCart};