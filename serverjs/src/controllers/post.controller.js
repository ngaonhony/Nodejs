const Post = require('../models/post.model'); // Đường dẫn đến mô hình Post

// Tạo bài viết mới
exports.createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lấy tất cả bài viết
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('userId').populate('categoryId').populate('serviceBookingId');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy bài viết theo ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('userId').populate('categoryId').populate('serviceBookingId');
    if (!post) return res.status(404).json({ message: 'Bài viết không tồn tại' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật bài viết
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) return res.status(404).json({ message: 'Bài viết không tồn tại' });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Xóa bài viết
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Bài viết không tồn tại' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};