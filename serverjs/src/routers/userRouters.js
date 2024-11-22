const express = require("express");
const userController = require("../controllers/user.controller");
const { protect, authorize } = require("../middlewares/auth.middleware");
const router = express.Router();

router.route("/").get(protect, authorize("admin"), userController.getAllUsers);

router
  .route("/:id")
  .get(protect, userController.getUserById)
  .patch(protect, userController.updateUser)
  .delete(protect, authorize("admin"), userController.deleteUser);

module.exports = router;
