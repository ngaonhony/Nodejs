const Service = require("../models/service.model");

// Tạo dịch vụ mới
exports.createService = async (req, res) => {
  try {
    const service = new Service({
      name: req.body.name,
      price_per_day: req.body.price_per_day,
      price_per_week: req.body.price_per_week,
      price_per_month: req.body.price_per_month,
      pushPrice: req.body.pushPrice,
      advantages: req.body.advantages,
      title_color: req.body.title_color,
      auto_approval: req.body.auto_approval,
      prominent_badge: req.body.prominent_badge,
      rating: req.body.rating, // Include rating
    });

    await service.save();
    res.status(201).send(service);
  } catch (error) {
    res.status(400).send({ message: "Error creating service", error });
  }
};

// Lấy tất cả dịch vụ
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.send(services);
  } catch (error) {
    res.status(500).send({ message: "Error fetching services", error });
  }
};

// Lấy dịch vụ theo ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).send({ message: "Service not found" });
    }
    res.send(service);
  } catch (error) {
    res.status(500).send({ message: "Error fetching service by ID", error });
  }
};

// Cập nhật dịch vụ theo ID
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return res.status(404).send({ message: "Service not found" });
    }
    res.send(service);
  } catch (error) {
    res.status(400).send({ message: "Error updating service", error });
  }
};

// Xóa dịch vụ theo ID
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).send({ message: "Service not found" });
    }
    res.send({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting service", error });
  }
};