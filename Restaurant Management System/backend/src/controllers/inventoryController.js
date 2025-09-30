// const InventoryItem = require('../models/InventoryItem');

// exports.getInventory = async (req, res) => {
//   try {
//     const items = await InventoryItem.find();
//     res.json(items);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.updateInventory = async (req, res) => {
//   try {
//     const item = await InventoryItem.findById(req.params.id);
//     if (!item) return res.status(404).json({ message: 'Item not found' });

//     item.quantity = req.body.quantity;
//     await item.save();
//     res.json(item);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// exports.getLowStock = async (req, res) => {
//   try {
//     const items = await InventoryItem.find({ quantity: { $lte: 10 } });
//     res.json(items);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const InventoryItem = require("../models/InventoryItem");

exports.getInventory = async (req, res) => {
  try {
    const items = await InventoryItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createInventory = async (req, res) => {
  try {
    const inventoryItem = new InventoryItem({
      name: req.body.name,
      quantity: req.body.quantity,
      unit: req.body.unit,
      minThreshold: req.body.minThreshold,
    });
    const newItem = await inventoryItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const item = await InventoryItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.name = req.body.name || item.name;
    item.quantity = req.body.quantity || item.quantity;
    item.unit = req.body.unit || item.unit;
    item.minThreshold = req.body.minThreshold || item.minThreshold;

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteInventory = async (req, res) => {
  try {
    const item = await InventoryItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    // await item.remove();
    await InventoryItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted", item: item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getLowStock = async (req, res) => {
  try {
    const items = await InventoryItem.find({ quantity: { $lte: 10 } });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
