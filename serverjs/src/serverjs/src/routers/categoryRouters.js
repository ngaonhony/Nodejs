const express = require("express");
const validateCategory=require("../middlewares/category")
const router = express.Router();
const categoryController = require("../controllers/category.controller");

router.post("/add",validateCategory, categoryController.createCategory);

router.get("/",categoryController.getCategories);

router.get("/:id", categoryController.getCategoryById);

router.put("/:id",validateCategory, categoryController.updateCategory);

router.delete("/:id",categoryController.deleteCategory);

module.exports = router;
