const {productManager} = require('../managers/ProductManager');
const { buildPaginationLinks } = require('../utils/paginationLinks');



async function getProducts(req, res) {
    try {
        const {limit,page,query,sort} = req.query;
        const products = await productManager.getProducts(
            limit,
            page,
            query,
            sort
        );


        const {prevLink,nextLink} = buildPaginationLinks(
            '/api/products',
            products,
            req.query
        );

        res.status(200).json({
            status: "success",

            payload: products.docs,

            totalPages: products.totalPages,

            prevPage: products.prevPage,

            nextPage: products.nextPage,

            page: products.page,

            hasPrevPage: products.hasPrevPage,

            hasNextPage: products.hasNextPage,

            prevLink,

            nextLink
        });

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