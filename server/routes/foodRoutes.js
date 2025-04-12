const express = require('express');
const router = express.Router();
const { getFoods, getFoodById } = require('../controllers/foodController');

// Route to get all foods with filtering, sorting and pagination
router.get('/', getFoods);

// Route to get a single food by ID
router.get('/:id', getFoodById);

module.exports = router;