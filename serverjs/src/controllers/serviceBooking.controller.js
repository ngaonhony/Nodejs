const ServiceBooking = require("../models/serviceBooking.model");

exports.createBooking = async (req, res) => {
  try {
    const booking = new ServiceBooking({
      userId: req.body.userId,
      serviceId: req.body.serviceId,
      bookingDate: req.body.bookingDate,
      bookingTime: req.body.bookingTime,
    });

    await booking.save();
    res.status(201).send(booking);
  } catch (error) {
    res.status(400).send({ message: "Error creating booking", error });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await ServiceBooking.find()
      .populate("userId", "name")
      .populate("serviceId", "name")
    res.send(bookings);
  } catch (error) {
    res.status(500).send({ message: "Error fetching bookings", error });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await ServiceBooking.findById(req.params.id)
      .populate("userId", "name")
      .populate("serviceId", "name")

    if (!booking) {
      return res.status(404).send({ message: "Booking not found" });
    }
    res.send(booking);
  } catch (error) {
    res.status(500).send({ message: "Error fetching booking by ID", error });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const booking = await ServiceBooking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!booking) {
      return res.status(404).send({ message: "Booking not found" });
    }
    res.send(booking);
  } catch (error) {
    res.status(400).send({ message: "Error updating booking", error });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await ServiceBooking.findByIdAndDelete(req.params.id);
    
    if (!booking) {
      return res.status(404).send({ message: "Booking not found" });
    }
    res.send({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting booking", error });
  }
};