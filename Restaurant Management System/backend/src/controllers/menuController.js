// const MenuItem = require('../models/MenuItem');

// exports.getMenuItems = async (req, res) => {
//   try {
//     const menuItems = await MenuItem.find().populate('ingredients');
//     res.json(menuItems);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.createMenuItem = async (req, res) => {
//   try {
//     const menuItem = new MenuItem({
//       name: req.body.name,
//       description: req.body.description,
//       price: req.body.price,
//       category: req.body.category,
//       ingredients: req.body.ingredients
//     });
//     const newMenuItem = await menuItem.save();
//     res.status(201).json(newMenuItem);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

const MenuItem = require("../models/MenuItem");

exports.getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find().populate("ingredients");
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createMenuItem = async (req, res) => {
  try {
    const menuItem = new MenuItem({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      ingredients: req.body.ingredients,
    });
    const newMenuItem = await menuItem.save();
    res.status(201).json(newMenuItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateMenuItem = async (req, res) => {
  // console.log(req.params);
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem)
      return res.status(404).json({ message: "Menu item not found" });

    menuItem.name = req.body.name || menuItem.name;
    menuItem.description = req.body.description || menuItem.description;
    menuItem.price = req.body.price || menuItem.price;
    menuItem.category = req.body.category || menuItem.category;
    menuItem.ingredients = req.body.ingredients || menuItem.ingredients;

    const updatedItem = await menuItem.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteMenuItem = async (req, res) => {
  try {
    console.log(req.params);
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem)
      return res.status(404).json({ message: "Menu item not found" });
    console.log(menuItem);
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Menu item deleted", menuItem: menuItem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
