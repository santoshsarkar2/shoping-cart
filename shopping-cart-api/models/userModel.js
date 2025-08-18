const db = require('../db');


/* USER AND LOGIN  */
exports.getAllUsers = async () => {
  const [rows] = await db.query('SELECT * FROM users');
  return rows;
};

exports.getUserById = async (id) => {
  const [rows] = await db.query('SELECT * FROM users WHERE user_id = ?', [id]);
  
  return rows[0];
};

exports.createUser = async (user) => {
  const [result] = await db.query('INSERT INTO users SET ?', user);
  return result.insertId;
};

exports.updateUser = async (id, user) => {
  await db.query('UPDATE users SET ? WHERE user_id = ?', [user, id]);
};

exports.deleteUser = async (id) => {
  await db.query('DELETE FROM users WHERE user_id = ?', [id]);
};

exports.updateProfile = async (id, user) => {
  await db.query('UPDATE users SET ? WHERE user_id = ?', [user, id]);
};

