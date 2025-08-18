const express = require('express');
const router = express.Router();

const controller = require('../controllers/orderController');

router.get('/orders/test', (req, res) => {
  res.send('order route working');
});

router.get('/orders', controller.getAllOrder);





module.exports = router;