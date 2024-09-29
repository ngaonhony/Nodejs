const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const category = require('../middlewares/category');

router.post('/add',category, categoryController.createCategory);

router.get('/', categoryController.getCategories);

router.get('/:id', categoryController.getCategoryById);

router.put('/:id',category, categoryController.updateCategory);

router.delete('/:id', categoryController.deleteCategory);
module.exports = router;