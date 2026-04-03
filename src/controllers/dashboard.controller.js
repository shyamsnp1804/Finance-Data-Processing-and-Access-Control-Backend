const Record = require("../models/record.model");
const mongoose = require("mongoose");

// DASHBOARD SUMMARY
const getDashboardSummary = async (req, res) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(req.userId);

    // TOTAL INCOME
    const totalIncome = await Record.aggregate([
      { $match: { user: userObjectId, type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // TOTAL EXPENSE
    const totalExpense = await Record.aggregate([
      { $match: { user: userObjectId, type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const income = totalIncome[0]?.total || 0;
    const expense = totalExpense[0]?.total || 0;

    // CATEGORY WISE
    const categoryData = await Record.aggregate([
      { $match: { user: userObjectId } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
      { $sort: { total: -1 } },
    ]);

    // MONTHLY TRENDS
    const monthlyData = await Record.aggregate([
      { $match: { user: userObjectId } },
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    res.json({
      success: true,
      summary: {
        totalIncome: income,
        totalExpense: expense,
        netBalance: income - expense,
        categoryBreakdown: categoryData,
        monthlyTrends: monthlyData,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getDashboardSummary };