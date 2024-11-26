const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service.controller");
const { protect, authorize } = require("../middlewares/auth.middleware");
const checkService = require("../middlewares/service.middleware");

router.post(
  "/",
  protect,
  authorize("admin"),
  checkService,
  serviceController.createService
);

router.get("/", serviceController.getAllServices);

router.get("/:id", protect, serviceController.getServiceById);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  serviceController.updateService
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  serviceController.deleteService
);

module.exports = router;
