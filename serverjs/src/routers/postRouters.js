const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller'); // Đường dẫn đến controller

router.post('/', postController.createPost);
router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete(':id', postController.deletePost);

module.exports = router;