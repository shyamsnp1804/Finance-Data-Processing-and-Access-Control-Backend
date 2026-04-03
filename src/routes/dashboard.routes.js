const express = require("express");
const { getDashboardSummary } = require("../controllers/dashboard.controller");

const requireAuth = require("../middlewares/auth.middlewares");
const requireRole = require("../middlewares/role.middleware");

const router = express.Router();

/**
 * @swagger
 * /api/dashboard/summary:
 *   get:
 *     summary: Get dashboard analytics (income, expense, trends)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard summary returned successfully
 */
router.get(
  "/summary",
  requireAuth,
  requireRole("viewer", "analyst", "admin"),
  getDashboardSummary
);

module.exports = router;