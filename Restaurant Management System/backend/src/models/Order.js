// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true },
//   items: [{
//     menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
//     quantity: { type: Number, required: true }
//   }],
//   status: { type: String, enum: ['pending', 'preparing', 'served', 'completed'], default: 'pending' },
//   total: { type: Number, required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Order', orderSchema);




// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true },
//   items: [{
//     menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
//     quantity: { type: Number, required: true }
//   }],
//   status: { 
//     type: String, 
//     enum: ['pending', 'preparing', 'served', 'completed', 'cancelled'], 
//     default: 'pending' 
//   },
//   total: { type: Number, required: true },
//   reservationTime: { type: Date }, // added for reservations
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Order', orderSchema);


const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true },
  items: [
    {
      menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
      quantity: { type: Number, required: true, min: 1 }
    }
  ],
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'preparing', 'served', 'completed','cancelled','available'],
    default: 'pending'
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
