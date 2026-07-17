const { productManager } = require('../managers/ProductManager');
const { createProductFromSocket, notifyProductsUpdate } = require('../services/productService');

module.exports = function setupProductSocket(io) {
  io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    // Evento: cliente pide todos los productos
    socket.on('getProducts', async () => {
      try {
        const products = await productManager.getProducts();
        socket.emit('productsList', products.docs);
      } catch (error) {
        console.error('Error al obtener productos:', error);
        socket.emit('error', { message: error.message });
      }
    });

    // Evento: agregar nuevo producto
    socket.on('addProduct', async (productData) => {
      try {
        await createProductFromSocket(productData);
        await notifyProductsUpdate();
        console.log('Producto agregado por socket');
      } catch (error) {
        console.error('Error al agregar producto:', error);
        socket.emit('error', { message: error.message });
      }
    });

    // Evento: actualizar producto
    socket.on('updateProduct', async (productId, updatedData) => {
      try {
        await productManager.updateProduct(productId, updatedData);
        await notifyProductsUpdate();
        console.log('Producto actualizado:', productId);
      } catch (error) {
        console.error('Error al actualizar producto:', error);
        socket.emit('error', { message: error.message });
      }
    });

    // Evento: eliminar producto
    socket.on('deleteProduct', async (productId) => {
      try {
        await productManager.deleteProduct(productId);
        await notifyProductsUpdate();
        console.log('Producto eliminado:', productId);
      } catch (error) {
        console.error('Error al eliminar producto:', error);
        socket.emit('error', { message: error.message });
      }
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
    });
  });
};
