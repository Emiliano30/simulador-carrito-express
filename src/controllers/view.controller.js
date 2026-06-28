const {productManager} = require('../managers/ProductManager');
const { createProductFromRequest } = require('../services/productService');

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

module.exports = {getProducts, addProduct, deleteProduct, updateProduct};