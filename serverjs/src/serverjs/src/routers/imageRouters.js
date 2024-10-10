const express = require("express");
const imageController = require("../controllers/image.controller");

const router = express.Router();

// Định nghĩa các route cho Image API
router
  .route("/")
  .get(imageController.getAllImages)
  .post(imageController.createImage);

router
  .route("/:id")
  .get(imageController.getImageById)
  .patch(imageController.updateImage)
  .delete(imageController.deleteImage);

module.exports = router;
