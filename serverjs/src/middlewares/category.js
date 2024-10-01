const { body, validationResult } = require('express-validator');
const Category = require('../models/category.model');
const validateCategory = [
    body('name').notEmpty().withMessage('Tên là bắt buộc')
    .custom(async (value) => {
        const existingCategory = await Category.findOne({ name: value });
        if (existingCategory) {
            throw new Error('Tên đã tồn tại');
        }
        return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = validateCategory;