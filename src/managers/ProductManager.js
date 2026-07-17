const ProductModel = require('../models/Product.model')

class ProductManager {
    
    async getProducts(limit = 10, page = 1, category,status, sort) {
        const filter = {};

        if(category){
            const normalizeCategory = category.trim()
            filter.category = {
                    $regex: `^${normalizeCategory}$`,
                    $options: 'i'
                }
        }

        if(status === 'false' || status === 'true'){
            filter.status = status === 'true';
        }

        const options = {
            limit:parseInt(limit),
            page:parseInt(page),
            lean:true
        }

        if(sort){
            options.sort = {
                price: sort === 'asc'? 1:-1
            }
        }

        const result = await ProductModel.paginate(filter,options)
        return result;
    }

    async getProductById(id) {
        const product = await ProductModel.findById(id)

        if (!product) {
            throw new Error('Producto no encontrado');
        }
        return product;
    }

    async addProduct(product){
        return await ProductModel.create(product)
    }

    async updateProduct(id, updatedFields) {

        const updatedProduct = await ProductModel.findByIdAndUpdate(
            id,
            updatedFields,
            {
                new:true,
                runValidators:true
            }
        )

        if(!updatedProduct){
            throw new Error("Producto no encontrado")
        }

        return updatedProduct
    }

    async deleteProduct(id) {
        const deletedProduct = await ProductModel.findByIdAndDelete(id);

        if(!deletedProduct){
            throw new Error("Producto no encontrado")
        }
        return deletedProduct
    }
}


const productManager = new ProductManager();

module.exports = {productManager};