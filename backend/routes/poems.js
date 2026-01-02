const express = require('express');
const { body } = require('express-validator');
const poemController = require('../controllers/poemController');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all poems
router.get('/', poemController.getPoems);

// Create new poem
router.post('/', auth, [
  body('title').notEmpty().trim(),
  body('content').notEmpty()
], poemController.createPoem);

// Get poem by ID
router.get('/:id', poemController.getPoemById);

// Update poem
router.put('/:id', auth, [
  body('title').notEmpty().trim(),
  body('content').notEmpty()
], poemController.updatePoem);

// Delete poem
router.delete('/:id', auth, poemController.deletePoem);

// Like/unlike poem
router.post('/:id/like', auth, poemController.likePoem);

// Add comment
router.post('/:id/comment', auth, [
  body('text').notEmpty().trim()
], poemController.addComment);

module.exports = router;