const express = require("express");
const imageController = require("../controllers/image.controller");
const middlewareImage = require("../middlewares/image");
const router = express.Router();

router
  .route("/")
  .get(imageController.getAllImages)
  .post(middlewareImage, imageController.createImage);

router
  .route("/:id")
  .get(imageController.getImageById)
  .patch(imageController.updateImage)
  .delete(imageController.deleteImage);

module.exports = router;
