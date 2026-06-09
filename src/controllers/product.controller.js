const {productManager} = require('../managers/ProductManager');



async function getProducts(req, res) {
    try {
        const products = await productManager.getProducts();
        res.status(200).json(products);

    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ error: error.message });
    }
}



async function getProductById(req, res) {
    try {
        const product = await productManager.getProductById(req.params.id);
        res.status(200).json(product);

    } catch (error) {
        console.error('Error al obtener el producto:', error);
        if (error.message === 'Producto no encontrado') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
}




async function addProduct(req, res) {
    try {
        const newProduct = await productManager.addProduct(req.body);
        res.status(201).json(newProduct);

    } catch (error) {
        console.error('Error al agregar el producto:', error);
        res.status(500).json({ error: error.message });
    }
}



async function updateProduct(req, res) {
    try {
        const updatedProduct = await productManager.updateProduct(req.params.id, req.body);
        res.status(200).json(updatedProduct);

    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        if (error.message === 'Producto no encontrado') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
}

async function deleteProduct(req, res) {
    try {
        const deletedProduct = await productManager.deleteProduct(req.params.id);
        res.status(200).json(deletedProduct);

    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        if (error.message === 'Producto no encontrado') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    getProducts, 
    getProductById, 
    addProduct, 
    updateProduct, 
    deleteProduct
};