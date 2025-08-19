const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');
const verifyToken = require('../verifyToken');

const upload = require('../middleware/upload');



router.get('/test', (req, res) => {
  res.send('User route working');
});
//router.get('/', verifyToken, controller.getUserInfo2);
router.get('/me', verifyToken, controller.getUserInfo2);

router.get('/', verifyToken, controller.getUsers);
router.get('/:id', controller.getUser);

//router.post('/', controller.createUser);
// POST create user (with avatar upload)
router.post('/', upload.single('avatar'), controller.createUser);

router.put('/:id', controller.updateUser);
//router.put('/', controller.updateUser);
router.delete('/:id', controller.deleteUser);








module.exports = router;