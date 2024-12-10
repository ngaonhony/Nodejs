const express = require("express");
const feedbackController = require("../controllers/feedback.controller");
const { protect, authorize } = require("../middlewares/auth.middleware");
const middlewareFeedback = require("../middlewares/feedback.middleware");
const router = express.Router();

router.post("/", middlewareFeedback, feedbackController.createFeedback);
router.get(
  "/",
  protect,
  authorize("admin"),
  feedbackController.getAllFeedbacks
);
router.put("/:id", feedbackController.updateFeedback);
router.delete("/:id", feedbackController.deleteFeedback);

module.exports = router;
