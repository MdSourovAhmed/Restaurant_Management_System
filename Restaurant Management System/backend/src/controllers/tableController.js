// const Table = require('../models/Table');

// exports.getTables = async (req, res) => {
//   try {
//     const tables = await Table.find();
//     res.json(tables);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getAvailableTables = async (req, res) => {
//   try {
//     const tables = await Table.find({ status: 'available' });
//     res.json(tables);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const Table = require("../models/Table");

exports.getTables = async (req, res) => {
  try {
    const tables = await Table.find();
    res.json(tables);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAvailableTables = async (req, res) => {
  try {
    const tables = await Table.find({ status: "available" });
    // const tables = await Table.find({});
    res.json(tables);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTable = async (req, res) => {
  try {
    const table = new Table({
      number: req.body.number,
      capacity: req.body.capacity,
      status: "available",
    });
    const newTable = await table.save();
    res.status(201).json(newTable);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateTable = async (req, res) => {
  try {
    console.log(req.params.id);
    const table = Table.findById(req.params.id);
    if (!table) return res.status(404).json({ message: "Table not found" });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTable = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table) return res.status(404).json({ message: "Table not found" });
    if (table.status !== "available") {
      return res
        .status(400)
        .json({ message: "Cannot delete occupied or reserved table" });
    }
    // await table.remove();
    await Table.findByIdAndDelete(req.params.id);
    res.json({ message: "Table deleted", table: table });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
