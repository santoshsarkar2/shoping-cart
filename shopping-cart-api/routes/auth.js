const express = require('express');
const router = express.Router();
const { signup, login, updateProfile, getProfile } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.put('/profile', updateProfile);
router.get('/profile', getProfile);



module.exports = router;