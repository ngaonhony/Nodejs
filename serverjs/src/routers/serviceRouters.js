// src/routes/serviceRoutes.js
const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller'); // Đường dẫn đến controller

// Các route cho Service
router.get('/', serviceController.getServices);
router.get('/:id', serviceController.getServiceById);
router.post('/', serviceController.addService);
router.put('/:id', serviceController.updateService);
router.delete('/:id', serviceController.deleteService);

module.exports = router;