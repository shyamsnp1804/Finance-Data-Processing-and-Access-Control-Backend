const express = require("express");
const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} = require("../controllers/record.controller");

const requireAuth = require("../middlewares/auth.middlewares");
const requireRole = require("../middlewares/role.middleware");

const router = express.Router();

/**
 * @swagger
 * /api/records:
 *   post:
 *     summary: Create a new record (Admin only)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               category:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Record created
 */
router.post("/", requireAuth, requireRole("admin"), createRecord);

/**
 * @swagger
 * /api/records:
 *   get:
 *     summary: Get all records with filters
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: List of records
 */
router.get("/", requireAuth, requireRole("viewer", "analyst", "admin"), getRecords);

/**
 * @swagger
 * /api/records/{id}:
 *   put:
 *     summary: Update a record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Record ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               category:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Record updated successfully
 */
router.put("/:id", requireAuth, requireRole("admin"), updateRecord);

/**
 * @swagger
 * /api/records/{id}:
 *   delete:
 *     summary: Delete a record (Admin only)
 *     description: Deletes a financial record by its ID. Only accessible by admin users.
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the record to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Record deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied (Admin only)
 *       404:
 *         description: Record not found
 */
router.delete("/:id", requireAuth, requireRole("admin"), deleteRecord);

module.exports = router;