const Product = require('../models/productModel');

exports.getAllCategory = async (req, res) => {
  const cat = await Product.getAllCategory();
  res.json(cat);
};

exports.getCategoryId = async (req, res) => {
  const cat = await Product.getCategoryById(req.params.id);
  cat ? res.json(cat) : res.status(404).json({ message: 'Category not found' });
};

exports.updateCategory = async (req, res) => {
  await Product.updateCategory(req.params.id, req.body);
  res.json({ message: 'Category updated' });
};

exports.deleteCategory = async (req, res) => {
  await Product.deleteCategory(req.params.id);
  res.json({ message: 'Category deleted' });
};


exports.createCategory = async (req, res) => {
  const id = await Product.createCategory(req.body);
  res.status(201).json({ id });
};

/* Products */
exports.getAllProducts = async (req, res) => {
  const products = await Product.getAllProducts();
  res.json(products);
};

exports.getProductById = async (req, res) => {
  const product = await Product.getProductById(req.params.id);
  product ? res.json(product) : res.status(404).json({ message: 'Product not found' });
};

exports.updateProduct = async (req, res) => {
  await Product.updateProduct(req.params.id, req.body);
  res.json({ message: 'Product updated' });
};

exports.deleteProduct = async (req, res) => {
  await Product.deleteProduct(req.params.id);
  res.json({ message: 'Product deleted' });
};

exports.createProduct = async (req, res) => {
  const id = await Product.createProduct(req.body);
  res.status(201).json({ id });
};