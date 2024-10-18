// src/routes/serviceBookingRoutes.js
const express = require('express');
const router = express.Router();
const serviceBookingController = require('../controllers/serviceBooking.model'); // Đường dẫn đến controller

// Các route cho ServiceBooking
router.get('/', serviceBookingController.getServiceBookings);
router.get('/:id', serviceBookingController.getServiceBookingById);
router.post('/', serviceBookingController.addServiceBooking);
router.put('/:id', serviceBookingController.updateServiceBooking);
router.delete('/:id', serviceBookingController.deleteServiceBooking);

module.exports = router;