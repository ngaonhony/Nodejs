const Category = require("../models/category.model");

exports.createCategory = async (req, res) => {
  try {
    const { name, description, status } = req.body;

    const category = new Category({
      name,
      description,
      status: status || "active",
    });

    await category.save();
    res.status(201).send(category);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error creating category", error });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .select("name description status")
      .sort({ createdAt: -1 });
    res.send(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching categories", error });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }
    res.send(category);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching category by ID", error });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name, description, status } = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description, status }, // Cập nhật các trường
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }
    res.send(category);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "Error updating category", error });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }
    res.send({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error deleting category", error });
  }
};
