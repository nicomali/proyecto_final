// managers/cartManager.js
const fs = require('fs').promises;
const path = require('path');

const cartsFilePath = path.join(__dirname, '../data/carts.json');

class CartManager {
  async createCart() {
    const carts = await this.getAllCarts();
    const newCart = {
      id: carts.length ? carts[carts.length - 1].id + 1 : 1,
      products: []
    };
    carts.push(newCart);
    await fs.writeFile(cartsFilePath, JSON.stringify(carts, null, 2));
    return newCart;
  }

  async getCartById(id) {
    const carts = await this.getAllCarts();
    return carts.find(cart => cart.id === parseInt(id));
  }

  async addProductToCart(cartId, productId) {
    const carts = await this.getAllCarts();
    const cart = carts.find(cart => cart.id === parseInt(cartId));
    if (!cart) {
      return null;
    }
    const productIndex = cart.products.findIndex(product => product.product === parseInt(productId));
    if (productIndex === -1) {
      cart.products.push({ product: parseInt(productId), quantity: 1 });
    } else {
      cart.products[productIndex].quantity += 1;
    }
    await fs.writeFile(cartsFilePath, JSON.stringify(carts, null, 2));
    return cart;
  }

  async getAllCarts() {
    const data = await fs.readFile(cartsFilePath, 'utf8');
    return JSON.parse(data);
  }
}

module.exports = CartManager;
