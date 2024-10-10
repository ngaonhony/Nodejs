const express = require("express");
const userController = require("../controllers/user.controller");
const middlewareUser = require("../middlewares/user")
const router = express.Router();

router
  .route("/")
  .get(userController.getAllUsers)
  .post(middlewareUser,userController.createUser);

router
  .route("/:id")
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
