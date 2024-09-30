const Review = require("../models/review.model");

exports.createReview = async (req, res) => {
  try {
    const review = new Review({
      listingId: req.body.listingId,
      userId: req.body.userId,
      rating: req.body.rating,
      comment: req.body.comment,
    });
    await review.save();
    res.status(201).send(review);
  } catch (error) {
    res.status(400).send({ message: "Error creating review", error });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("listingId", "name")
      .populate("userId", "name");
    res.send(reviews);
  } catch (error) {
    res.status(500).send({ message: "Error fetching reviews", error });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate("listingId", "name")
      .populate("userId", "name");
    if (!review) {
      return res.status(404).send({ message: "Review not found" });
    }
    res.send(review);
  } catch (error) {
    res.status(500).send({ message: "Error fetching review by ID", error });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!review) {
      return res.status(404).send({ message: "Review not found" });
    }
    res.send(review);
  } catch (error) {
    res.status(400).send({ message: "Error updating review", error });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).send({ message: "Review not found" });
    }
    res.send({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting review", error });
  }
};
