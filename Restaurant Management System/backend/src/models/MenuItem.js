const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: {type: String, default: "blank"},
  category: { type: String, required: true },
  available: { type: Boolean, default: true },
  ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'InventoryItem' }]
});

module.exports = mongoose.model('MenuItem', menuItemSchema);