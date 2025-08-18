const User = require('../models/userModel');

exports.getUsers = async (req, res) => {
  const users = await User.getAllUsers();
  res.json(users);
};

exports.getUser = async (req, res) => {
  const user = await User.getUserById(req.params.id);
  user ? res.json(user) : res.status(404).json({ message: 'User not found' });
};

exports.createUser = async (req, res) => {
  const id = await User.createUser(req.body);
  res.status(201).json({ id });
};

exports.updateUser = async (req, res) => {
  await User.updateUser(req.params.id, req.body);
  res.json({ message: 'User updated' });
};

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
