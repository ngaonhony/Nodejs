const Category = require("../models/category.model");

exports.createCategory = async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      icon_url: req.body.icon_url,
      available: req.body.available,
    });
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(400).send({ message: "Error creating category", error });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().select(
      "name description icon_url available"
    );
    res.send(categories);
  } catch (error) {
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
    res.status(500).send({ message: "Error fetching category by ID", error });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }
    res.send(category);
  } catch (error) {
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
    res.status(500).send({ message: "Error deleting category", error });
  }
};
