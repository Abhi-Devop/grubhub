const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Preparing', 'Out for Delivery', 'Delivered'], default: 'Pending' },
  paymentMethod: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
