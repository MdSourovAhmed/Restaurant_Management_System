const Order = require('../models/Order');

exports.getDailySales = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    
    const sales = await Order.aggregate([
      { $match: { createdAt: { $gte: startOfDay }, status: 'completed' } },
      { $group: { _id: null, totalSales: { $sum: '$total' }, orderCount: { $sum: 1 } } }
    ]);
    
    res.json(sales[0] || { totalSales: 0, orderCount: 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};