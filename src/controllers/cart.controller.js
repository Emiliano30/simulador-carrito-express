const {cartManager} = require('../managers/CartManager');



async function addCart(req, res) {
    try {
        const newCart = await cartManager.addCart();
        res.status(201).json(newCart);

    } catch (error) {
        console.error('Error al crear el carrito:', error);
        res.status(500).json({ error: error.message });
    }
}



async function getCartById(req, res) {
    try {
        const cartProducts = await cartManager.getCartsById(req.params.id);
        res.status(200).json(cartProducts);

    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        if (error.message === 'Carrito no encontrado') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
}



async function addProductToCart(req,res) {
    try {
        const updatedCart = await cartManager.updateCart(req.params.cartId, req.params.productId);
        res.status(200).json(updatedCart);

    }catch (error){
        console.error('Error al agregar el producto al carrito:', error);
        if (error.message === 'Carrito no encontrado') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
}



module.exports = {
    addCart,
    getCartById,
    addProductToCart
}