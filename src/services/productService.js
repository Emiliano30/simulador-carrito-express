const { productManager } = require('../managers/ProductManager');
const { getIO } = require('../config/socket.io');
const fs = require('fs/promises');
const path = require('path');
const { paths } = require('../config/config-app');



async function createProductFromRequest(req) {

  const thumbnailUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
  const productData = {
    title: req.body.title,
    description: req.body.description,
    code: req.body.code,
    price: Number(req.body.price),
    stock: Number(req.body.stock),
    category: req.body.category,
    thumbnails: thumbnailUrl ? [thumbnailUrl] : []
  };

  const newProduct = await productManager.addProduct(productData);
  return newProduct;
}




async function createProductFromSocket(productData) {
  let thumbnailUrl = '';

  // Si nos mandaron un archivo de imagen en Base64
  if (productData.imageBuffer) {
    // Removemos la cabecera del formato Base64 (ej: "data:image/png;base64,")
    const base64Data = productData.imageBuffer.replace(/^data:image\/\w+;base64,/, "");
    // Convertimos el texto a un Buffer binario real
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Creamos un nombre único para que no se pisen archivos iguales
    const fileName = `${Date.now()}-${productData.imageName}`;
    const filePath = path.join(paths.pathUpload, fileName);

    // Guardamos la imagen de forma asíncrona en el disco
    await fs.writeFile(filePath, buffer);
    thumbnailUrl = `/uploads/${fileName}`;
  }

  // Creamos el objeto final tal cual lo espera el ProductManager
  const finalProductData = {
    title: productData.title,
    description: productData.description,
    code: productData.code,
    price: Number(productData.price),
    stock: Number(productData.stock),
    category: productData.category,
    thumbnails: thumbnailUrl ? [thumbnailUrl] : []
  };

  // Guardamos en el JSON
  const newProduct = await productManager.addProduct(finalProductData);
  return newProduct;
}



async function notifyProductsUpdate() {
  const updatedProducts = await productManager.getProducts();
  try {
    getIO().emit('productsList', updatedProducts);
  } catch (error) {
    console.error('No se pudo emitir productsList:', error.message);
  }
}

module.exports = { createProductFromRequest, createProductFromSocket, notifyProductsUpdate };
