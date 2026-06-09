const fs = require('fs/promises');
const path = require('path');
const {configPath} = require('../config/config-app');
const {v4: uuidv4} = require('uuid');

class ProductManager {
    constructor() {
        this.products = path.join(configPath, 'products.json');
    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.products, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al leer el archivo de productos:', error);
            if (error.code === 'ENOENT') {
                await fs.writeFile(this.products, JSON.stringify([], null, 2));
                return [];
            }
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts();

            const product = products.find(product => product.id === id);
            if (!product) {
                throw new Error('Producto no encontrado');
            }

            return product;
        } catch (error) {
            console.error('Error al obtener el producto por ID:', error);
            throw error;
        }
    }

    async addProduct(product){
        try{
            const products = await this.getProducts();

            const newProduct = {
                id: uuidv4(),
                status: true,
                ...product
            };

            products.push(newProduct);

            await fs.writeFile(this.products, JSON.stringify(products, null, 2));
            return newProduct;
        } catch (error) {
            console.error('Error al agregar el producto:', error);
            throw error;
        }
    }

    async updateProduct(id, updatedFields) {
        try {
            const products = await this.getProducts();
            const productIndex = products.findIndex(product => product.id === id);

            if (productIndex === -1) {
                throw new Error('Producto no encontrado');
            }

            const updatedProduct = { ...products[productIndex], ...updatedFields, id:products[productIndex].id };
            products[productIndex] = updatedProduct;

            await fs.writeFile(this.products, JSON.stringify(products, null, 2));
            return updatedProduct;
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            const productIndex = products.findIndex(product => product.id === id);

            if (productIndex === -1) {
                throw new Error('Producto no encontrado');
            }

            const deletedProduct = products.splice(productIndex, 1)[0];
            
            await fs.writeFile(this.products, JSON.stringify(products, null, 2));
            return deletedProduct;
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            throw error;
        }
    }
}


const productManager = new ProductManager();

module.exports = {productManager};