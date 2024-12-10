const Feedback = require("../models/feedback.model");

exports.createFeedback = async (req, res) => {
  try {
    const feedback = new Feedback({
      name: req.body.name, 
      phone: req.body.phone, 
      comment: req.body.comment,
    });

    await feedback.save(); 
    res.status(201).send(feedback);
  } catch (error) {
    res.status(400).send({ message: "Error creating feedback", error });
  }
};

exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
    res.send(feedbacks);
  } catch (error) {
    res.status(500).send({ message: "Error fetching feedbacks", error });
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