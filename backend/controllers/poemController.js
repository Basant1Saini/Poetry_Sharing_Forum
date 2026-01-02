const { validationResult } = require('express-validator');
const Poem = require('../models/Poem');

// Get all poems
exports.getPoems = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const poems = await Poem.find({ isPublished: true })
      .populate('author', 'username profile.firstName profile.lastName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Poem.countDocuments({ isPublished: true });
    
    res.json({
      poems,
      pagination: {
        page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new poem
exports.createPoem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const poem = await Poem.create({
      ...req.body,
      author: req.user.id
    });
    
    await poem.populate('author', 'username profile.firstName profile.lastName');
    
    res.status(201).json(poem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get poem by ID
exports.getPoemById = async (req, res) => {
  try {
    const poem = await Poem.findById(req.params.id)
      .populate('author', 'username profile.firstName profile.lastName')
      .populate('comments.user', 'username');
    
    if (!poem) {
      return res.status(404).json({ message: 'Poem not found' });
    }
    
    res.json(poem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update poem
exports.updatePoem = async (req, res) => {
  try {
    const poem = await Poem.findById(req.params.id);
    
    if (!poem) {
      return res.status(404).json({ message: 'Poem not found' });
    }
    
    if (poem.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    Object.assign(poem, req.body);
    await poem.save();
    
    res.json(poem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete poem
exports.deletePoem = async (req, res) => {
  try {
    const poem = await Poem.findById(req.params.id);
    
    if (!poem) {
      return res.status(404).json({ message: 'Poem not found' });
    }
    
    if (poem.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await poem.deleteOne();
    
    res.json({ message: 'Poem deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like/unlike poem
exports.likePoem = async (req, res) => {
  try {
    const poem = await Poem.findById(req.params.id);
    
    if (!poem) {
      return res.status(404).json({ message: 'Poem not found' });
    }
    
    const likeIndex = poem.likes.findIndex(
      like => like.user.toString() === req.user.id
    );
    
    if (likeIndex > -1) {
      poem.likes.splice(likeIndex, 1);
    } else {
      poem.likes.push({ user: req.user.id });
    }
    
    await poem.save();
    
    res.json({ 
      likes: poem.likes.length,
      isLiked: likeIndex === -1
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add comment
exports.addComment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const poem = await Poem.findById(req.params.id);
    
    if (!poem) {
      return res.status(404).json({ message: 'Poem not found' });
    }
    
    poem.comments.push({
      user: req.user.id,
      text: req.body.text
    });
    
    await poem.save();
    await poem.populate('comments.user', 'username');
    
    res.json(poem.comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};