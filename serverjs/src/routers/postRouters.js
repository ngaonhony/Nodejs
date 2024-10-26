const express = require("express");
const postController = require("../controllers/post.controller");
const { protect, authorize } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/",protect, postController.createPost);
router.get("/",protect, authorize("admin"), postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.put("/:id",protect, postController.updatePost);
router.delete("/:id",protect, postController.deletePost);

module.exports = router;
