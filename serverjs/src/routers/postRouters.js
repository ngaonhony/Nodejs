const express = require("express");
const postController = require("../controllers/post.controller");
const { isAdmin, isOwnerOrAdmin } = require("../middlewares/post");
const router = express.Router();

router.post("/", postController.createPost);

router.get("/", postController.getAllPosts);

router.get("/:id", postController.getPostById);

router.put("/:id", isOwnerOrAdmin, postController.updatePost);

router.delete("/:id", isOwnerOrAdmin, postController.deletePost);

module.exports = router;
