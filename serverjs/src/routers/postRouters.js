const express = require("express");
const postController = require("../controllers/post.controller");
const { protect} = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", postController.createPost);

router.get("/", postController.getAllPosts);

router.get("/:id", postController.getPostById);

router.put("/:id", protect, postController.updatePost);

router.delete("/:id", protect, postController.deletePost);

module.exports = router;
