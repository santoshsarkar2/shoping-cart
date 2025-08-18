const db = require('../db');

/* CATEGORY  */
exports.getAllCategory = async () => {
    const [rows] = await db.query('SELECT * FROM categories');
    return rows;
};
exports.createCategory = async (cat) => {
  const [result] = await db.query('INSERT INTO categories SET ?', cat);
  return result.insertId;
};
exports.getCategoryById = async (id) => {
  const [rows] = await db.query('SELECT * FROM categories WHERE category_id = ?', [id]);  
  return rows[0];
};

exports.updateCategory = async (id, cat) => {
  await db.query('UPDATE categories SET ? WHERE category_id = ?', [cat, id]);
};

exports.deleteCategory = async (id) => {
  await db.query('DELETE FROM categories WHERE category_id = ?', [id]);
};



/* Products  */
exports.getAllProducts = async () => {
    //const [rows] = await db.query('SELECT p.product_id, p.name, p.description, p.price, p.stock_quantity, p.sku, c.name as category, pi.image_url as image FROM products p JOIN categories c ON p.category_id = c.category_id LEFT JOIN product_images pi ON pi.product_id = p.product_id');
    const [rows] = await db.query('SELECT p.product_id, p.name, p.description, p.price, p.stock_quantity, p.sku, c.name AS category, GROUP_CONCAT(pi.image_url) AS image FROM products p JOIN categories c ON p.category_id = c.category_id LEFT JOIN product_images pi ON pi.product_id = p.product_id GROUP BY p.product_id, p.name, p.description, p.price, p.stock_quantity, p.sku, c.name');

    
    return rows;
};

exports.getProductById = async (id) => {
  const [rows] = await db.query('SELECT * FROM products WHERE product_id = ?', [id]);
  
  return rows[0];
};
exports.updateProduct = async (id, product) => {
  await db.query('UPDATE products SET ? WHERE product_id = ?', [product, id]);
};

exports.deleteProduct = async (id) => {
  await db.query('DELETE FROM products WHERE product_id = ?', [id]);
};

exports.createProduct = async (product) => {
  const [result] = await db.query('INSERT INTO products SET ?', product);
  return result.insertId;
};



