const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', auth, userController.getProfile);

// Update user profile
router.put('/profile', auth, userController.updateProfile);

// Get user by ID
router.get('/:id', userController.getUserById);

// Follow/unfollow user
router.post('/follow/:id', auth, userController.followUser);

module.exports = router;