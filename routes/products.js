// routes/products.js
const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/productManager');

const productManager = new ProductManager();

// Ruta raíz GET / para listar todos los productos
router.get('/', async (req, res) => {
  const products = await productManager.getAllProducts();
  res.json(products);
});

// Ruta GET /:pid para obtener un producto por ID
router.get('/:pid', async (req, res) => {
  const product = await productManager.getProductById(req.params.pid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

// Ruta raíz POST / para agregar un nuevo producto
router.post('/', async (req, res) => {
  const newProduct = await productManager.addProduct(req.body);
  res.status(201).json(newProduct);
});

// Ruta PUT /:pid para actualizar un producto por ID
router.put('/:pid', async (req, res) => {
  const updatedProduct = await productManager.updateProduct(req.params.pid, req.body);
  if (updatedProduct) {
    res.json(updatedProduct);
  } else {
    res.status(404).send('Product not found');
  }
});

// Ruta DELETE /:pid para eliminar un producto por ID
router.delete('/:pid', async (req, res) => {
  const success = await productManager.deleteProduct(req.params.pid);
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).send('Product not found');
  }
});

module.exports = router;
