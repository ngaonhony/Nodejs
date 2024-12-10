// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
router.get('/all', paymentController.getAllPayments);
router.get('/', paymentController.getAllPostsAndPayments);
router.get('/:userId', paymentController.getPostsAndPaymentsByUserId);
router.delete('/:paymentId', paymentController.deletePostAndPaymentById);
module.exports = router;