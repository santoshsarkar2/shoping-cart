const db = require('../db');

exports.getAllOrder = async () => {
    const [rows] = await db.query('SELECT o.order_id, u.first_name, o.total_amount, p.name as product, p.price FROM orders o, users u, order_items oi, products p WHERE u.user_id=o.user_id and o.order_id=oi.order_id and oi.product_id=p.product_id');
    return rows;
};