const Food = require('../models/Food');

exports.getAllFood = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createFood = async (req, res) => {
  const food = new Food({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
  });

  try {
    const newFood = await food.save();
    res.status(201).json(newFood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.searchFoods = async (req, res) => {
  try {
    const { query } = req.query;
    const foods = await Food.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPopularFoods = async (req, res) => {
  try {
    // Ini hanya contoh sederhana. Anda mungkin ingin mengimplementasikan logika yang lebih kompleks
    // untuk menentukan menu populer, misalnya berdasarkan jumlah pesanan atau rating
    const popularFoods = await Food.find().sort('-createdAt').limit(4);
    res.json(popularFoods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};