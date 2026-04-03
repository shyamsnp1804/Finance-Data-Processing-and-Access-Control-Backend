const express = require("express");
const {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  me,
} = require("../controllers/user.controller");

const requireAuth = require("../middlewares/auth.middlewares");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logoutUser);

// 👇 PROTECTED ROUTE
router.get("/me", requireAuth, me);

module.exports = router;
