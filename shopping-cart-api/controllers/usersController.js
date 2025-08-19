const User = require('../models/userModel');

const db = require('../db');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

exports.getUsers = async (req, res) => {
  const users = await User.getAllUsers();
  res.json(users);
};

exports.getUser = async (req, res) => {
  const user = await User.getUserById(req.params.id);
  user ? res.json(user) : res.status(404).json({ message: 'User not found' });
};
/*
exports.createUser = async (req, res) => {
  const id = await User.createUser(req.body);
  res.status(201).json({ id });
};

exports.updateUser = async (req, res) => {
  await User.updateUser(req.params.id, req.body);
  res.json({ message: 'User updated' });
};
*/
exports.deleteUser = async (req, res) => {
  await User.deleteUser(req.params.id);
  res.json({ message: 'User deleted' });
};



/*
const db = require('../db');
exports.getUserInfo = (req, res) => {
  const userId = req.user.user_id; // from token
  console.log("GetUser:" + userId);
  const sql = 'SELECT user_id, first_name, last_name, email FROM users WHERE user_id = ?';

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'User not found...' });
    res.json(results[0]);
  });
};
*/

exports.getUserInfo2 = async (req, res) => {
  const userId = req.user.user_id; // from token
  const user = await User.getUserById(userId);
  user ? res.json(user) : res.status(404).json({ message: 'User not found' });  
};

////////


// Create user (with avatar upload)
exports.createUser = async (req, res) => {
  const { first_name, last_name, email, password, address, phone_number, role } = req.body;

  // Validation
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: 'Required fields missing' });
  }

  try {
    const [existing] = await db.query('SELECT email FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
     const avatarUrl = req.file ? `/uploads/${req.file.filename}` : null;

    console.log("file Name: ",avatarUrl);
    const [result] = await db.query(
      `INSERT INTO users (first_name, last_name, email, password, address, phone_number, avatar, role)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [first_name, last_name, email, hashedPassword, address || null, phone_number || null, avatarUrl, role || 'customer']
    );

    res.status(201).json({
      message: 'User created successfully',
      user_id: result.insertId
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, address, phone_number, role } = req.body;

  try {
    const [existing] = await db.query('SELECT avatar FROM users WHERE user_id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    //const avatarUrl = req.file ? `/uploads/${req.file.filename}` : null;
    let avatarUrl = existing[0].avatar;

    // Handle new avatar upload
    if (req.file) {
      // Delete old avatar if exists
      if (avatarUrl) {
        const oldPath = avatarUrl.replace(`/uploads/avatars/`, '');
        const fullPath = path.join(__dirname, '..', 'uploads', 'avatars', oldPath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      }
      avatarUrl = `/uploads/avatars/${req.file.filename}`;
    }

    const [result] = await db.query(
      `UPDATE users SET first_name = ?, last_name = ?, email = ?, address = ?, phone_number = ?, avatar = ?, role = ?
       WHERE user_id = ?`,
      [first_name, last_name, email, address || null, phone_number || null, avatarUrl, role, id]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: 'No changes made' });
    }

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};