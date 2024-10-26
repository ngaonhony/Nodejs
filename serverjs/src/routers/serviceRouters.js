const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service.controller");
const { protect, authorize } = require("../middlewares/authMiddleware");
const checkService = require("../middlewares/service");
// Tạo dịch vụ mới
router.post("/",protect, authorize("admin"),checkService, serviceController.createService);

// Lấy tất cả dịch vụ
router.get("/", serviceController.getAllServices);

// Lấy dịch vụ theo ID
router.get("/:id",protect, serviceController.getServiceById);

// Cập nhật dịch vụ theo ID
router.put("/:id",protect, authorize("admin"), serviceController.updateService);

// Xóa dịch vụ theo ID
router.delete("/:id",protect, authorize("admin"), serviceController.deleteService);

module.exports = router;