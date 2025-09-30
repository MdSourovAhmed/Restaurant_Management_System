// const Order = require('../models/Order');
// const Table = require('../models/Table');
// const MenuItem = require('../models/MenuItem');
// const InventoryItem = require('../models/InventoryItem');

// exports.createOrder = async (req, res) => {
//   try {
//     const { tableId, items } = req.body;

//     const table = await Table.findById(tableId);
//     if (!table || table.status !== 'available') {
//       return res.status(400).json({ message: 'Table not available' });
//     }

//     let total = 0;
//     for (const item of items) {
//       const menuItem = await MenuItem.findById(item.menuItem).populate('ingredients');
//       total += menuItem.price * item.quantity;

//       for (const ingredient of menuItem.ingredients) {
//         const inventoryItem = await InventoryItem.findById(ingredient);
//         if (inventoryItem.quantity < item.quantity) {
//           return res.status(400).json({ message: `${inventoryItem.name} out of stock` });
//         }
//         inventoryItem.quantity -= item.quantity;
//         await inventoryItem.save();
//       }
//     }

//     table.status = 'occupied';
//     await table.save();

//     const order = new Order({
//       table: tableId,
//       items,
//       total,
//     });

//     const newOrder = await order.save();
//     res.status(201).json(newOrder);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ message: 'Order not found' });

//     order.status = req.body.status;
//     if (req.body.status === 'completed') {
//       const table = await Table.findById(order.table);
//       table.status = 'available';
//       await table.save();
//     }

//     await order.save();
//     res.json(order);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// exports.getOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().populate('table').populate('items.menuItem');
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const Order = require("../models/Order");
const Table = require("../models/Table");
const User = require("../models/User");
const MenuItem = require("../models/MenuItem");
const InventoryItem = require("../models/InventoryItem");

exports.createOrder = async (req, res) => {
  try {
    const { userId, tableId, items } = req.body;
    // console.log(tableId,'Items',items);

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User Does not Exist" });

    const table = await Table.findById(tableId);
    if (!table || table.status !== "available") {
      return res.status(400).json({ message: "Table not available" });
    }

    let total = 0;
    for (var item of items) {
      console.log(item.menuItem);
      const menuItem = await MenuItem.findById({ _id: item.menuItem }).populate(
        "ingredients"
      );
      console.log(menuItem);
      total += menuItem.price * item.quantity;

      // for (const ingredient of menuItem.ingredients) {
      //   const inventoryItem = await InventoryItem.findById(ingredient);
      //   if (inventoryItem.quantity < item.quantity) {
      //     return res.status(400).json({ message: `${inventoryItem.name} out of stock` });
      //   }
      //   inventoryItem.quantity -= item.quantity;
      //   await inventoryItem.save();
      // }
    }

    table.status = "occupied";
    await table.save();

    const order = new Order({
      table: tableId,
      items,
      total,
      user: user._id,
    });

    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = req.body.status;
    if (req.body.status === "completed"||req.body.status === "cancelled") {
      const table = await Table.findById(order.table);
      table.status = "available";
      await table.save();
    }

    await order.save();
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    // console.log(req.user);
    const orders = await Order.find()
      .populate("table")
      .populate("items.menuItem");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getOrdersByUser = async (req, res) => {
  try {
    console.log(req.params.id);
    const orders = await Order.find({user:req.params.id})
      .populate("table")
      .populate("items.menuItem");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.status !== "completed") {
      const table = await Table.findById(order.table);
      table.status = "available";
      await table.save();
    }
    // await order.remove();
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
