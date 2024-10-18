// src/controllers/serviceBookingController.js
const ServiceBooking = require('../models/serviceBooking.model'); // Đường dẫn đến mô hình ServiceBooking

// Lấy tất cả dịch vụ đặt chỗ
exports.getServiceBookings = async (req, res) => {
  try {
    const serviceBookings = await ServiceBooking.find()
      .populate('userId')
      .populate('serviceId');
    res.status(200).json(serviceBookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy dịch vụ đặt chỗ theo ID
exports.getServiceBookingById = async (req, res) => {
  try {
    const serviceBooking = await ServiceBooking.findById(req.params.id)
      .populate('userId')
      .populate('serviceId');
    if (!serviceBooking) return res.status(404).json({ message: 'Dịch vụ đặt chỗ không tồn tại' });
    res.status(200).json(serviceBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Thêm dịch vụ đặt chỗ mới
exports.addServiceBooking = async (req, res) => {
  const serviceBooking = new ServiceBooking(req.body);
  try {
    const savedServiceBooking = await serviceBooking.save();
    res.status(201).json(savedServiceBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cập nhật dịch vụ đặt chỗ
exports.updateServiceBooking = async (req, res) => {
  try {
    const updatedServiceBooking = await ServiceBooking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedServiceBooking) return res.status(404).json({ message: 'Dịch vụ đặt chỗ không tồn tại' });
    res.status(200).json(updatedServiceBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Xóa dịch vụ đặt chỗ
exports.deleteServiceBooking = async (req, res) => {
  try {
    const deletedServiceBooking = await ServiceBooking.findByIdAndDelete(req.params.id);
    if (!deletedServiceBooking) return res.status(404).json({ message: 'Dịch vụ đặt chỗ không tồn tại' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};