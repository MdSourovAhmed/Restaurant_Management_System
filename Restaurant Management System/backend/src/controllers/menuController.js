// // const MenuItem = require('../models/MenuItem');

// // exports.getMenuItems = async (req, res) => {
// //   try {
// //     const menuItems = await MenuItem.find().populate('ingredients');
// //     res.json(menuItems);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // exports.createMenuItem = async (req, res) => {
// //   try {
// //     const menuItem = new MenuItem({
// //       name: req.body.name,
// //       description: req.body.description,
// //       price: req.body.price,
// //       category: req.body.category,
// //       ingredients: req.body.ingredients
// //     });
// //     const newMenuItem = await menuItem.save();
// //     res.status(201).json(newMenuItem);
// //   } catch (err) {
// //     res.status(400).json({ message: err.message });
// //   }
// // };

// const MenuItem = require("../models/MenuItem");

// exports.getMenuItems = async (req, res) => {
//   // const category = req.params.id.toLowerCase();

//   // console.log(req.params.id);
//   try {
//     const menuItems = await MenuItem.find().populate("ingredients");
//     res.json(menuItems);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getMenuItemsByCategory = async (req, res) => {
//   const Category = req.params.category.toLowerCase();
//   console.log(Category);

//   try {
//     const menuItems = await MenuItem.find({category:Category});
//     res.json(menuItems);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getMenuCategories = async (req, res) => {
//   console.log("menuCategories");
//   try {
//     const menuCategories = await MenuItem.distinct('category');
//     res.status(200).json(menuCategories);
//     // console.log(menuCategories);
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
//       ingredients: req.body.ingredients,
//     });
//     const newMenuItem = await menuItem.save();
//     res.status(201).json(newMenuItem);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// exports.updateMenuItem = async (req, res) => {
//   // console.log(req.params);
//   try {
//     const menuItem = await MenuItem.findById(req.params.id);
//     if (!menuItem)
//       return res.status(404).json({ message: "Menu item not found" });

//     menuItem.name = req.body.name || menuItem.name;
//     menuItem.description = req.body.description || menuItem.description;
//     menuItem.price = req.body.price || menuItem.price;
//     menuItem.category = req.body.category || menuItem.category;
//     menuItem.ingredients = req.body.ingredients || menuItem.ingredients;

//     const updatedItem = await menuItem.save();
//     res.json(updatedItem);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// exports.deleteMenuItem = async (req, res) => {
//   try {
//     console.log(req.params);
//     const menuItem = await MenuItem.findById(req.params.id);
//     if (!menuItem)
//       return res.status(404).json({ message: "Menu item not found" });
//     console.log(menuItem);
//     await MenuItem.findByIdAndDelete(req.params.id);
//     res.json({ message: "Menu item deleted", menuItem: menuItem });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const MenuItem = require("../models/MenuItem");

/**
 * @desc    Get all menu items
 * @route   GET /api/menu
 * @access  Public
 */
exports.getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find().populate("ingredients");
    res.status(200).json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ message: "Failed to fetch menu items" });
  }
};

/**
 * @desc    Get menu items by category
 * @route   GET /api/menu/:category
 * @access  Public
 */
exports.getMenuItemsByCategory = async (req, res) => {
  try {
    const category = req.params.category?.toLowerCase();
    if (!category)
      return res.status(400).json({ message: "Category is required" });

    const menuItems = await MenuItem.find({
      category: { $regex: new RegExp(`^${category}$`, "i") },
    }).populate("ingredients");

    res.status(200).json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items by category:", error);
    res.status(500).json({ message: "Failed to fetch menu items by category" });
  }
};

/**
 * @desc    Get all unique menu categories
 * @route   GET /api/menu/categories
 * @access  Public
 */
exports.getMenuCategories = async (req, res) => {
  try {
    const categories = await MenuItem.distinct("category");
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching menu categories:", error);
    res.status(500).json({ message: "Failed to fetch menu categories" });
  }
};

/**
 * @desc    Create a new menu item
 * @route   POST /api/menu
 * @access  Private (Admin)
 */
exports.createMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, ingredients } = req.body;

    if (!name || !price || !category) {
      return res
        .status(400)
        .json({ message: "Name, price, and category are required" });
    }

    const newMenuItem = new MenuItem({
      name,
      description,
      price,
      category: category.toLowerCase(),
      ingredients,
    });

    const savedItem = await newMenuItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Error creating menu item:", error);
    res.status(400).json({ message: "Failed to create menu item" });
  }
};

/**
 * @desc    Update a menu item
 * @route   PUT /api/menu/:id
 * @access  Private (Admin)
 */
exports.updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, ingredients } = req.body;

    const menuItem = await MenuItem.findById(id);
    if (!menuItem)
      return res.status(404).json({ message: "Menu item not found" });

    menuItem.name = name ?? menuItem.name;
    menuItem.description = description ?? menuItem.description;
    menuItem.price = price ?? menuItem.price;
    menuItem.category = category?.toLowerCase() ?? menuItem.category;
    menuItem.ingredients = ingredients ?? menuItem.ingredients;

    const updatedItem = await menuItem.save();
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(400).json({ message: "Failed to update menu item" });
  }
};

/**
 * @desc    Delete a menu item
 * @route   DELETE /api/menu/:id
 * @access  Private (Admin)
 */
exports.deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await MenuItem.findById(id);

    if (!menuItem)
      return res.status(404).json({ message: "Menu item not found" });

    await menuItem.deleteOne();
    res
      .status(200)
      .json({ message: "Menu item deleted successfully", item: menuItem });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ message: "Failed to delete menu item" });
  }
};
