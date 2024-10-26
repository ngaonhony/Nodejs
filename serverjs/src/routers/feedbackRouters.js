const express = require("express");
const feedbackController = require("../controllers/feedback.controller");
const { protect, authorize } = require("../middlewares/authMiddleware");
const middlewareFeedback = require("../middlewares/feedback");
const router = express.Router();

router.post("/", middlewareFeedback, feedbackController.createFeedback);
router.get("/",protect, authorize("admin"), feedbackController.getAllFeedbacks);
router.get("/:id", feedbackController.getFeedbackById);
router.put("/:id", feedbackController.updateFeedback);
router.delete("/:id", feedbackController.deleteFeedback);

module.exports = router;
