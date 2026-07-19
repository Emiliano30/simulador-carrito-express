const CartModel = require('../models/Cart.model')
const ProductModel = require('../models/Product.model')
class CartManager {

    async getCarts(){
        return await CartModel.find()
    }


    async getCartById(id){
        const cart = await CartModel.findById(id).populate('products.product').lean()

        if(!cart){
            throw new Error('Carrito no encontrado');
        }

        return cart
    }


    async addCart(){
        return await CartModel.create({
            products:[]
        })
    }


    async addProductToCart(cartId,productId){
        const cart = await CartModel.findById(cartId);
        const product = await ProductModel.findById(productId);

        if(!cart){
            throw new Error('Carrito no encontrado')
        }

        if(!product){
            throw new Error('Producto no encontrado')
        }

        const existingProductIndex = cart.products.findIndex(
            item => item.product.equals(productId)
        )

        if(existingProductIndex !== -1){
            cart.products[existingProductIndex].quantity++
        }else{
            cart.products.push({
                product:productId,
                quantity:1
            })
        };

        await cart.save();
        return cart
    }


    async deleteProductFromCart(cartId,productId){
        const cart = await CartModel.findById(cartId);

        if(!cart){
            throw new Error('Carrito no encontrado')
        };

        const cantidadAnterior = cart.products.length;

        cart.products = cart.products.filter(p => !p.product.equals(productId));

        if(cart.products.length === cantidadAnterior){
            throw new Error('El producto no existe en el carrito')
        }

        await cart.save();

        return cart
    }


    async updateProductQuantity(cartId,productId,quantity){
        const cart = await CartModel.findById(cartId);

        if(!cart){
            throw new Error('Carrito no encontrado')
        };

        const product = cart.products.find(p => p.product.equals(productId));

        if(!product){
            throw new Error('Producto no encontrado')
        }

        product.quantity = quantity;

        await cart.save();
        return cart;
    }


    async clearCart(cartId){
        const cart = await CartModel.findById(cartId);

        if(!cart){
            throw new Error('Carrito no encontrado')
        };

        cart.products = [];

        await cart.save();
        return cart;
    }


    async updateProductsCart(cartId,products){
        const cart = await CartModel.findById(cartId);

        if(!cart){
            throw new Error('Carrito no encontrado')
        };
        const ids = products.map(p => p.product)
        const existingProducts = await ProductModel.find({
            _id:{
                $in:ids
            }
        })

        if(existingProducts.length !== products.length){
            throw new Error('Uno o mas productos no existen')
        }
        
        cart.products = products;
        await cart.save();
        return cart
  
    }
}

const cartManager = new CartManager();

module.exports = {cartManager};