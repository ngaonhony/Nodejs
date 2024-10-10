const express = require("express");
const middlewareCategory=require("../middlewares/category")
const router = express.Router();
const categoryController = require("../controllers/category.controller");

router.post("/add",middlewareCategory, categoryController.createCategory);

router.get("/",categoryController.getCategories);

router.get("/:id", categoryController.getCategoryById);

router.put("/:id", categoryController.updateCategory);

router.delete("/:id",categoryController.deleteCategory);

module.expogitrts = router;
