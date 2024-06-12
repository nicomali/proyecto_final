// routes/carts.js
const express = require('express');
const router = express.Router();
const CartManager = require('../managers/cartManager');

const cartManager = new CartManager();

// Ruta raíz POST / para crear un nuevo carrito
router.post('/', async (req, res) => {
  const newCart = await cartManager.createCart();
  res.status(201).json(newCart);
});

// Ruta GET /:cid para listar productos de un carrito
router.get('/:cid', async (req, res) => {
  const cart = await cartManager.getCartById(req.params.cid);
  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).send('Cart not found');
  }
});

// Ruta POST /:cid/product/:pid para agregar un producto a un carrito
router.post('/:cid/product/:pid', async (req, res) => {
  const updatedCart = await cartManager.addProductToCart(req.params.cid, req.params.pid);
  if (updatedCart) {
    res.json(updatedCart);
  } else {
    res.status(404).send('Cart or Product not found');
  }
});

module.exports = router;
