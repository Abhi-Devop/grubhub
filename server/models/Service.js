const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: String }, // e.g., 'Starters', 'Main Course'
  isVeg: { type: Boolean, default: false }
});

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, default: 4.0 },
  time: { type: String, required: true }, // Delivery time estimate
  deliveryFee: { type: String, required: true },
  tags: [{ type: String }],
  menu: [menuItemSchema] // Embedded menu items for simplicity
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
