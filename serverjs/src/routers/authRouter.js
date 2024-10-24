const express = require("express");
const authController = require("../controllers/auth.controller");
const { protect, authorize } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", authController.register);
router.post("/verify", authController.verifyEmail);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

router.get("/admin", protect, authorize("admin"), (req, res) => {
  res.json({ message: "Admin access granted", user: req.user });
});

module.exports = router;
