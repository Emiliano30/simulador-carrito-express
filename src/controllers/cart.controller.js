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
        const cartProducts = await cartManager.getCartById(req.params.id);
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
        const updatedCart = await cartManager.addProductToCart(req.params.cartId, req.params.productId);
        res.status(200).json(updatedCart);

    }catch (error){
        console.error('Error al agregar el producto al carrito:', error);
        if (error.message === 'Carrito no encontrado') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
}


async function deleteProductFromCart(req,res){
    try {
        const deleteCart = await cartManager.deleteProductFromCart(req.params.cartId, req.params.productId);
        res.status(200).json(deleteCart)
    } catch (error) {
        if(error.message === 'Carrito no encontrado'){
            return res.status(404).json({error:error.message})
        };
        res.status(500).json({error:error.message})
    }
}

async function updateProductQuantity(req,res){
    try {
        const {quantity} = req.body;
        const updateCart = await cartManager.updateProductQuantity(req.params.cartId, req.params.productId,quantity);
        res.status(200).json(updateCart)
    } catch (error) {
        if(error.message === 'Carrito no encontrado' || error.message === 'Producto no encontrado'){
            return res.status(404).json({error: error.message})
        }
        res.status(500).json({error: error.message})
    }
}

async function clearCart(req,res) {
    try {
        const clearCart = await cartManager.clearCart(req.params.cartId);
        res.status(200).json(clearCart);
    } catch (error) {
        if(error.message === 'Carrito no encontrado'){
            return res.status(404).json({error: error.message})
        }

        res.status(500).json({error: error.message})
    }
}


async function updateProductsCart(req,res){
    try {
        const updateCart = await cartManager.updateProductsCart(req.params.cartId, req.body);
        res.status(200).json(updateCart)
    } catch (error) {
        if(error.message === 'Carrito no encontrado' || error.message === 'Producto no encontrado'){
            return res.status(404).json({error: error.message})
        }
        res.status(500).json({error: error.message})
    }
}


module.exports = {
    addCart,
    getCartById,
    addProductToCart,
    deleteProductFromCart,
    updateProductQuantity,
    clearCart,
    updateProductsCart
}