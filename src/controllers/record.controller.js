const Record = require("../models/record.model");

// CREATE RECORD (Admin only)
const createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, notes } = req.body;

    if (!amount || !type) {
      return res.status(400).json({ message: "Amount and type required" });
    }

    const record = await Record.create({
      user: req.userId,
      amount,
      type,
      category,
      date,
      notes,
    });

    res.status(201).json({
      success: true,
      record,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET RECORDS (All roles but filtered)
const getRecords = async (req, res) => {
  try {
    const { type, category, startDate, endDate, page = 1, limit = 10 } = req.query;

    let filter = { user: req.userId };

    if (type) filter.type = type;
    if (category) filter.category = category;

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const records = await Record.find(filter)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      success: true,
      count: records.length,
      records,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE RECORD (Admin only)
const updateRecord = async (req, res) => {
  try {
    const record = await Record.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    Object.assign(record, req.body);
    await record.save();

    res.json({
      success: true,
      record,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE RECORD (Admin only)
const deleteRecord = async (req, res) => {
  try {
    const record = await Record.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json({
      success: true,
      message: "Record deleted",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
};