const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Database connection
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

// Middleware to get DB connection
async function getDbConnection() {
    return await mysql.createConnection(dbConfig);
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// Users APIs
app.get('/api/users', async (req, res) => {
    const conn = await getDbConnection();
    try {
        const [rows] = await conn.execute('SELECT user_id, first_name, last_name, email, address, phone_number, avatar_url, role FROM users');
        res.json(rows);
    } catch (err) {
        throw err;
    } finally {
        await conn.end();
    }
});

app.get('/api/users/:id', async (req, res) => {
    const conn = await getDbConnection();
    try {
        const [rows] = await conn.execute('SELECT user_id, first_name, last_name, email, address, phone_number, avatar_url, role FROM users WHERE user_id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'User not found' });
        res.json(rows[0]);
    } catch (err) {
        throw err;
    } finally {
        await conn.end();
    }
});

app.post('/api/users', async (req, res) => {
    const { first_name, last_name, email, password_hash, address, phone_number, avatar_url, role } = req.body;
    if (!first_name || !last_name || !email || !password_hash || !role) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const conn = await getDbConnection();
    try {
        const [result] = await conn.execute(
            'INSERT INTO users (first_name, last_name, email, password_hash, address, phone_number, avatar_url, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [first_name, last_name, email, password_hash, address, phone_number, avatar_url, role]
        );
        res.status(201).json({ user_id: result.insertId });
    } catch (err) {
        res.status(400).json({ error: err.message });
    } finally {
        await conn.end();
    }
});

// Categories APIs
app.get('/api/categories', async (req, res) => {
    const conn = await getDbConnection();
    try {
        const [rows] = await conn.execute('SELECT * FROM categories');
        res.json(rows);
    } catch (err) {
        throw err;
    } finally {
        await conn.end();
    }
});

app.post('/api/categories', async (req, res) => {
    const { name, description, image_url } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });
    const conn = await getDbConnection();
    try {
        const [result] = await conn.execute(
            'INSERT INTO categories (name, description, image_url) VALUES (?, ?, ?)',
            [name, description, image_url]
        );
        res.status(201).json({ category_id: result.insertId });
    } catch (err) {
        throw err;
    } finally {
        await conn.end();
    }
});

// Products APIs
app.get('/api/products', async (req, res) => {
    const conn = await getDbConnection();
    try {
        const [rows] = await conn.execute('SELECT * FROM products');
        res.json(rows);
    } catch (err) {
        throw err;
    } finally {
        await conn.end();
    }
});

app.get('/api/products/:id', async (req, res) => {
    const conn = await getDbConnection();
    try {
        const [rows] = await conn.execute('SELECT * FROM products WHERE product_id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Product not found' });
        const [images] = await conn.execute('SELECT * FROM product_images WHERE product_id = ?', [req.params.id]);
        res.json({ ...rows[0], images });
    } catch (err) {
        throw err;
    } finally {
        await conn.end();
    }
});

app.post('/api/products', async (req, res) => {
    const { category_id, name, description, price, stock_quantity, sku } = req.body;
    if (!name || !price || !stock_quantity || !sku) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const conn = await getDbConnection();
    try {
        const [result] = await conn.execute(
            'INSERT INTO products (category_id, name, description, price, stock_quantity, sku) VALUES (?, ?, ?, ?, ?, ?)',
            [category_id, name, description, price, stock_quantity, sku]
        );
        res.status(201).json({ product_id: result.insertId });
    } catch (err) {
        res.status(400).json({ error: err.message });
    } finally {
        await conn.end();
    }
});

// Product Images APIs
app.post('/api/product_images', async (req, res) => {
    const { product_id, image_url, is_primary } = req.body;
    if (!product_id || !image_url) return res.status(400).json({ error: 'Missing required fields' });
    const conn = await getDbConnection();
    try {
        if (is_primary) {
            await conn.execute('UPDATE product_images SET is_primary = FALSE WHERE product_id = ?', [product_id]);
        }
        const [result] = await conn.execute(
            'INSERT INTO product_images (product_id, image_url, is_primary) VALUES (?, ?, ?)',
            [product_id, image_url, is_primary || false]
        );
        res.status(201).json({ image_id: result.insertId });
    } catch (err) {
        throw err;
    } finally {
        await conn.end();
    }
});

// Product Reviews APIs
app.post('/api/product_reviews', async (req, res) => {
    const { product_id, user_id, rating, comment } = req.body;
    if (!product_id || !user_id || !rating) return res.status(400).json({ error: 'Missing required fields' });
    const conn = await getDbConnection();
    try {
        const [result] = await conn.execute(
            'INSERT INTO product_reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)',
            [product_id, user_id, rating, comment]
        );
        res.status(201).json({ review_id: result.insertId });
    } catch (err) {
        res.status(400).json({ error: err.message });
    } finally {
        await conn.end();
    }
});

// Discounts APIs
app.get('/api/discounts', async (req, res) => {
    const conn = await getDbConnection();
    try {
        const [rows] = await conn.execute('SELECT * FROM discounts WHERE valid_from <= NOW() AND (valid_until >= NOW() OR valid_until IS NULL) AND (max_uses IS NULL OR uses_count < max_uses)');
        res.json(rows);
    } catch (err) {
        throw err;
    } finally {
        await conn.end();
    }
});

app.post('/api/discounts', async (req, res) => {
    const { code, description, discount_type, discount_value, valid_from, valid_until, max_uses } = req.body;
    if (!code || !discount_type || !discount_value) return res.status(400).json({ error: 'Missing required fields' });
    const conn = await getDbConnection();
    try {
        const [result] = await conn.execute(
            'INSERT INTO discounts (code, description, discount_type, discount_value, valid_from, valid_until, max_uses) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [code, description, discount_type, discount_value, valid_from, valid_until, max_uses]
        );
        res.status(201).json({ discount_id: result.insertId });
    } catch (err) {
        res.status(400).json({ error: err.message });
    } finally {
        await conn.end();
    }
});

app.post('/api/carts/:cartId/apply-discount', async (req, res) => {
    const { discount_code } = req.body;
    const conn = await getDbConnection();
    try {
        const [discounts] = await conn.execute(
            'SELECT discount_id FROM discounts WHERE code = ? AND valid_from <= NOW() AND (valid_until >= NOW() OR valid_until IS NULL) AND (max_uses IS NULL OR uses_count < max_uses)',
            [discount_code]
        );
        if (discounts.length === 0) return res.status(404).json({ error: 'Invalid or expired discount code' });
        await conn.execute('UPDATE carts SET discount_id = ? WHERE cart_id = ?', [discounts[0].discount_id, req.params.cartId]);
        res.json({ message: 'Discount applied' });
    } catch (err) {
        throw err;
    } finally {
        await conn.end();
    }
});

// Wishlist APIs
app.post('/api/wishlist', async (req, res) => {
    const { user_id, product_id } = req.body;
    if (!user_id || !product_id) return res.status(400).json({ error: 'Missing required fields' });
    const conn = await getDbConnection();
    try {
        const [result] = await conn.execute(
            'INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)',
            [user_id, product_id]
        );
        res.status(201).json({ wishlist_id: result.insertId });
    } catch (err) {
        res.status(400).json({ error: err.message });
    } finally {
        await conn.end();
    }
});

app.get('/api/wishlist/:userId', async (req, res) => {
    const conn = await getDbConnection();
    try {
        const [rows] = await conn.execute(
            'SELECT w.wishlist_id, p.* FROM wishlist w JOIN products p ON w.product_id = p.product_id WHERE w.user_id = ?',
            [req.params.userId]
        );
        res.json(rows);
    } catch (err) {
        throw err;
    } finally {
        await conn.end();
    }
});

// Shipping Methods APIs
app.get('/api/shipping_methods', async (req, res) => {
    const conn = await getDbConnection();
    try {
        const [rows] = await conn.execute('SELECT * FROM shipping_methods');
        res.json(rows);
    } catch (err) {
        throw err;
    } finally {
        await conn.end();
    }
});

// Carts APIs
app.post('/api/carts', async (req, res) => {
    const { user_id } = req.body;
    if (!user_id) return res.status(400).json({ error: 'User ID is required' });
    const conn = await getDbConnection();
    try {
        const [result] = await conn.execute('INSERT INTO carts (user_id) VALUES (?)', [user_id]);
        res.status(201).json({ cart_id: result.insertId });
    } catch (err) {
        throw err;
    } finally {
        await conn.end();
    }
});

app.post('/api/carts/:cartId/items', async (req, res) => {
    const { product_id, quantity } = req.body;
    if (!product_id || !quantity) return res.status(400).json({ error: 'Missing required fields' });
    const conn = await getDbConnection();
    try {
        const [result] = await conn.execute(
            'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)',
            [req.params.cartId, product_id, quantity]
        );
        res.status(201).json({ cart_item_id: result.insertId });
    } catch (err) {
        res.status(400).json({ error: err.message });
    } finally {
        await conn.end();
    }
});

app.get('/api/carts/:cartId', async (req, res) => {
    const conn = await getDbConnection();
    try {
        const [cart] = await conn.execute('SELECT * FROM carts WHERE cart_id = ?', [req.params.cartId]);
        if (cart.length === 0) return res.status(404).json({ error: 'Cart not found' });
        const [items] = await conn.execute(
            'SELECT ci.*, p.name, p.price FROM cart_items ci JOIN products p ON ci.product_id = p.product_id WHERE ci.cart_id = ?',
            [req.params.cartId]
        );
        res.json({ ...cart[0], items });
    } catch (err) {
        throw err;
    } finally {
        await conn.end();
    }
});

// Orders APIs
app.post('/api/orders', async (req, res) => {
    const { user_id, shipping_address, payment_method, shipping_method_id, discount_id } = req.body;
    if (!user_id || !shipping_address || !payment_method || !shipping_method_id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const conn = await getDbConnection();
    try {
        await conn.beginTransaction();
        const [cart] = await conn.execute('SELECT * FROM carts WHERE user_id = ?', [user_id]);
        if (cart.length === 0) return res.status(404).json({ error: 'Cart not found' });
        const [items] = await conn.execute(
            'SELECT ci.product_id, ci.quantity, p.price FROM cart_items ci JOIN products p ON ci.product_id = p.product_id WHERE ci.cart_id = ?',
            [cart[0].cart_id]
        );
        let total_amount = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
        if (discount_id) {
            const [discount] = await conn.execute('SELECT * FROM discounts WHERE discount_id = ? AND valid_from <= NOW() AND (valid_until >= NOW() OR valid_until IS NULL)', [discount_id]);
            if (discount.length > 0) {
                total_amount = discount[0].discount_type === 'percentage'
                    ? total_amount * (1 - discount[0].discount_value / 100)
                    : total_amount - discount[0].discount_value;
            }
        }
        const [orderResult] = await conn.execute(
            'INSERT INTO orders (user_id, total_amount, discount_id, shipping_method_id, status, shipping_address, payment_method) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [user_id, total_amount, discount_id, shipping_method_id, 'pending', shipping_address, payment_method]
        );
        for (const item of items) {
            await conn.execute(
                'INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal) VALUES (?, ?, ?, ?, ?)',
                [orderResult.insertId, item.product_id, item.quantity, item.price, item.quantity * item.price]
            );
        }
        await conn.execute('DELETE FROM cart_items WHERE cart_id = ?', [cart[0].cart_id]);
        await conn.commit();
        res.status(201).json({ order_id: orderResult.insertId });
    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        await conn.end();
    }
});

app.get('/api/orders/:userId', async (req, res) => {
    const conn = await getDbConnection();
    try {
        const [rows] = await conn.execute(
            'SELECT o.*, d.code, sm.name AS shipping_method FROM orders o LEFT JOIN discounts d ON o.discount_id = d.discount_id LEFT JOIN shipping_methods sm ON o.shipping_method_id = sm.shipping_method_id WHERE o.user_id = ?',
            [req.params.userId]
        );
        res.json(rows);
    } catch (err) {
        throw err;
    } finally {
        await conn.end();
    }
});

// Order Notes APIs
app.post('/api/order_notes', async (req, res) => {
    const { order_id, user_id, note_text } = req.body;
    if (!order_id || !note_text) return res.status(400).json({ error: 'Missing required fields' });
    const conn = await getDbConnection();
    try {
        const [result] = await conn.execute(
            'INSERT INTO order_notes (order_id, user_id, note_text) VALUES (?, ?, ?)',
            [order_id, user_id, note_text]
        );
        res.status(201).json({ note_id: result.insertId });
    } catch (err) {
        throw err;
    } finally {
        await conn.end();
    }
});

// Payment Transactions APIs
app.get('/api/payment_transactions/:orderId', async (req, res) => {
   const conn = await getDbConnection();
    try {
        const [rows] = await conn.execute('SELECT * FROM payment_transactions WHERE order_id = ?', [req.params.orderId]);
        res.json(rows);
    } catch (err) {
        throw err;
    } finally {
        await conn.end();
    }
});

app.listen(4000, () => {
    console.log('Server running on http://localhost:4000');
});