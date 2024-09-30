const express = require("express");
const { register, login, logout } = require("../controllers/auth.controller");
const { protect, authorize } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/admin", protect, authorize("admin"), (req, res) => {
  res.json({ message: "Admin access granted" });
});

module.exports = router;
