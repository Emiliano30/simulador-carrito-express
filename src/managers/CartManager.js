const fs = require('fs/promises');
const path = require('path');
const {configPath} = require('../config/config-app');
const {v4: uuidv4} = require('uuid');
const {productManager} = require('./ProductManager');

class CartManager {
    constructor(){
        this.carts = path.join(configPath, 'carts.json');
    }

    async getCarts(){
        try{
            const data = await fs.readFile(this.carts, 'utf-8');
            return JSON.parse(data);
        }catch (error){
            console.error('Error al leer el archivo de carritos:', error);
            if (error.code === 'ENOENT') {
                await fs.writeFile(this.carts, JSON.stringify([], null, 2));
                return [];
            }
            throw error;
        }
    }

    async getCartsById(id){
        try{
            const carts = await this.getCarts();
            const cart = carts.find(cart => cart.id === id);
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }
            return cart.products;
        }catch (error){
            console.error('Error al obtener el carrito:', error);
            throw error;
        }
    }

    async addCart(){
        try{
            const carts = await this.getCarts();
            const newCart = {
                id: uuidv4(),
                quantity: 0,
                products:[]
            };
            carts.push(newCart);
            await fs.writeFile(this.carts, JSON.stringify(carts, null, 2));
            return newCart;

        }
        catch (error){
            console.error('Error al crear el carrito:', error);
            throw error;
        }
    }

    async updateCart(cartId, productId){
        try{
            const carts = await this.getCarts();
            const cart = carts.find(cart => cart.id === cartId);
            if(!cart){
                throw new Error('Carrito no encontrado');
            }
            const product = await productManager.getProductById(productId);
            cart.quantity += 1;

            const existingProductIndex = cart.products.findIndex(p => p.productId === productId);
            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity += 1;
            } else {
                cart.products.push({productId, quantity: 1});
            }

            await fs.writeFile(this.carts, JSON.stringify(carts, null, 2));
            return cart;

        }catch (error){
            console.error('Error al agregar el producto al carrito:', error);
            throw error;
        }
    }
}

const cartManager = new CartManager();

module.exports = {cartManager};