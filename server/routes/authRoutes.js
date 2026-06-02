const express = require('express');
const router = express.Router();
const { loginAdmin, registerAdmin, verifyToken } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginAdmin);
router.post('/register', registerAdmin);
router.get('/verify', protect, verifyToken);

module.exports = router;
