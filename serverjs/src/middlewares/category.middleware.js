const Category = require("../models/category.model");

const middlewareCategory = async (req, res, next) => {
  const { name } = req.body;
  if (name) {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ error: "Tên danh mục đã tồn tại." });
    }
  }
  next();
};

module.exports = middlewareCategory;
