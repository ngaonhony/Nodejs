const express = require("express");
const router = express.Router();
const serviceBookingController = require("../controllers/serviceBooking.controller");
const { protect, authorize } = require("../middlewares/auth.middleware");

router.post("/", protect, serviceBookingController.createBooking);

router.get(
  "/",
  protect,
  authorize("admin"),
  serviceBookingController.getAllBookings
);

router.get("/:id", protect, serviceBookingController.getBookingById);

router.put("/:id", protect, serviceBookingController.updateBooking);

router.delete("/:id", protect, serviceBookingController.deleteBooking);

module.exports = router;
