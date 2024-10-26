const Post = require("../models/post.model");

exports.createPost = async (req, res) => {
  try {
    const post = new Post({
      userId: req.body.userId,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      location: req.body.location,
      area: req.body.area,
      categoryId: req.body.categoryId,
      images: req.body.images, // Thêm mảng ảnh vào bài viết
    });
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send({ message: "Error creating post", error });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "name")
      .populate("categoryId", "name");
    res.send(posts);
  } catch (error) {
    res.status(500).send({ message: "Error fetching posts", error });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("userId", "name")
      .populate("categoryId", "name");
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    res.send(post);
  } catch (error) {
    res.status(500).send({ message: "Error fetching post by ID", error });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    res.send(post);
  } catch (error) {
    res.status(400).send({ message: "Error updating post", error });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    res.send({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting post", error });
  }
};