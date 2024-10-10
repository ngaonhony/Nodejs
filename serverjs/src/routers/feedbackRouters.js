const express = require("express");
const feedbackController = require("../controllers/feedback.controller");
const middlewareFeedback = require("../middlewares/feedback")
const router = express.Router();

router.post("/", middlewareFeedback,feedbackController.createFeedback);
router.get("/", feedbackController.getAllFeedbacks);
router.get("/:id", feedbackController.getFeedbackById);
router.put("/:id", feedbackController.updateFeedback);
router.delete("/:id", feedbackController.deleteFeedback);
module.exports = router;
