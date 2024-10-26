const express = require("express");
const middlewareCategory = require("../middlewares/category");
const { protect, authorize } = require("../middlewares/authMiddleware");
const router = express.Router();
const categoryController = require("../controllers/category.controller");

router.post("/",protect, authorize("admin"),middlewareCategory, categoryController.createCategory);

router.get("/", categoryController.getCategories);

router.get("/:id", categoryController.getCategoryById);

router.put("/:id",protect, authorize("admin"), categoryController.updateCategory);

router.delete("/:id",protect, authorize("admin") , categoryController.deleteCategory);

module.exports = router;
