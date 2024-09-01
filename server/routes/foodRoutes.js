const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

router.get('/', foodController.getAllFood);
router.post('/', foodController.createFood);
router.get('/search', foodController.searchFoods);
router.get('/popular', foodController.getPopularFoods);

module.exports = router;