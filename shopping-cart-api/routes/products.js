const express = require('express');
const router = express.Router();

const controller = require('../controllers/productController');

router.get('/category/test1', (req, res) => {
  res.send('User route working');
});

/* CATEGORY */
router.get('/category', controller.getAllCategory);
router.get('/category/:id', controller.getCategoryId);
router.post('/category', controller.createCategory);
router.put('/category/:id', controller.updateCategory);
router.delete('/category/:id', controller.deleteCategory);

/* PRODUCTS */
router.get('/product', controller.getAllProducts);
router.get('/product/:id', controller.getProductById);
router.post('/product', controller.createProduct);
router.put('/product/:id', controller.updateProduct);
router.delete('/product/:id', controller.deleteProduct);




module.exports = router;


