const express = require('express');
const router = express.Router();
const { getContacts, getMessages, sendMessage, heartbeat, offline } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

router.post('/heartbeat', protect, heartbeat);
router.post('/offline', protect, offline);
router.get('/contacts', protect, getContacts);
router.get('/', protect, getMessages);
router.post('/', protect, sendMessage);

module.exports = router;
