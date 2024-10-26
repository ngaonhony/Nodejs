const express = require("express");
const router = express.Router();
const serviceBookingController = require("../controllers/serviceBooking.controller");
const { protect, authorize } = require("../middlewares/authMiddleware");

// Tạo đặt chỗ mới
router.post("/",protect, serviceBookingController.createBooking);

// Lấy tất cả đặt chỗ
router.get("/",protect, authorize("admin"), serviceBookingController.getAllBookings);

// Lấy đặt chỗ theo ID
router.get("/:id",protect, serviceBookingController.getBookingById);

// Cập nhật đặt chỗ theo ID
router.put("/:id",protect, serviceBookingController.updateBooking);

// Xóa đặt chỗ theo ID
router.delete("/:id",protect, serviceBookingController.deleteBooking);

module.exports = router;