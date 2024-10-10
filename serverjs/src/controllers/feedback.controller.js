const Feedback = require("../models/feedback.model");

exports.createFeedback = async (req, res) => {
  try {
    const feedback = new Feedback({
      postId: req.body.postId, // Sửa thành postId
      userId: req.body.userId,
      name: req.body.name, // Thêm trường name
      phone: req.body.phone, // Thêm trường phone
      rating: req.body.rating,
      comment: req.body.comment,
    });

    await feedback.save(); // Sửa feedback.save() thành feedback.save()
    res.status(201).send(feedback);
  } catch (error) {
    res.status(400).send({ message: "Error creating feedback", error });
  }
};

exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("postId", "name") // Sửa thành postId
      .populate("userId", "name");
    res.send(feedbacks);
  } catch (error) {
    res.status(500).send({ message: "Error fetching feedbacks", error });
  }
};

exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id)
      .populate("postId", "name") // Sửa thành postId
      .populate("userId", "name");
    if (!feedback) {
      return res.status(404).send({ message: "Feedback not found" });
    }
    res.send(feedback);
  } catch (error) {
    res.status(500).send({ message: "Error fetching feedback by ID", error });
  }
};

exports.updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!feedback) {
      return res.status(404).send({ message: "Feedback not found" });
    }
    res.send(feedback);
  } catch (error) {
    res.status(400).send({ message: "Error updating feedback", error });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).send({ message: "Feedback not found" });
    }
    res.send({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting feedback", error });
  }
};