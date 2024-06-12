// managers/productManager.js
const fs = require('fs').promises;
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

class ProductManager {
  async getAllProducts() {
    const data = await fs.readFile(productsFilePath, 'utf8');
    return JSON.parse(data);
  }

  async getProductById(id) {
    const products = await this.getAllProducts();
    return products.find(product => product.id === parseInt(id));
  }

  async addProduct(productData) {
    const products = await this.getAllProducts();
    const newProduct = {
      id: products.length ? products[products.length - 1].id + 1 : 1,
      title: productData.title,
      description: productData.description,
      code: productData.code,
      price: productData.price,
      status: productData.status,
      stock: productData.stock,
      category: productData.category,
      thumbnails: productData.thumbnails
    };
    products.push(newProduct);
    await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));
    return newProduct;
  }

  async updateProduct(id, productData) {
    const products = await this.getAllProducts();
    const index = products.findIndex(product => product.id === parseInt(id));
    if (index === -1) {
      return null;
    }
    const updatedProduct = {
      ...products[index],
      title: productData.title !== undefined ? productData.title : products[index].title,
      description: productData.description !== undefined ? productData.description : products[index].description,
      code: productData.code !== undefined ? productData.code : products[index].code,
      price: productData.price !== undefined ? productData.price : products[index].price,
      status: productData.status !== undefined ? productData.status : products[index].status,
      stock: productData.stock !== undefined ? productData.stock : products[index].stock,
      category: productData.category !== undefined ? productData.category : products[index].category,
      thumbnails: productData.thumbnails !== undefined ? productData.thumbnails : products[index].thumbnails
    };
    products[index] = updatedProduct;
    await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));
    return updatedProduct;
  }

  async deleteProduct(id) {
    const products = await this.getAllProducts();
    const index = products.findIndex(product => product.id === parseInt(id));
    if (index === -1) {
      return false;
    }
    products.splice(index, 1);
    await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));
    return true;
  }
}

module.exports = ProductManager;
