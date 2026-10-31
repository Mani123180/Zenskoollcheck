const express = require('express');
const router = express.Router();
const { login, syncUser, getMe, getDemoAccounts } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', login);
router.post('/sync-user', syncUser);
router.get('/me', protect, getMe);
router.get('/demo-accounts', getDemoAccounts);

module.exports = router;
