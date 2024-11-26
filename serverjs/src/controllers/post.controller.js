const Post = require("../models/post.model");
const { uploadImage, deleteImage } = require("../config/cloudinary");
const fs = require("fs");

exports.createPost = async (req, res) => {
  try {
    const imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadImage(file.path);
        imageUrls.push(result.secure_url);
        fs.unlinkSync(file.path);
      }
    }
    if (!req.userId) {
      return res.status(400).json({ message: "Không tìm thấy userId" });
    }

    const newPost = new Post({
      userId: req.userId,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      location: req.body.location,
      area: req.body.area,
      categoryId: req.body.categoryId,
      serviceId: req.body.serviceId,
      images: imageUrls,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "name phone createdAt")
      .populate("categoryId", "name")
      .populate("serviceId","name rating title_color")
    res.send(posts);
  } catch (error) {
    res.status(500).send({ message: "Error fetching posts", error });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("userId", "name phone createdAt")
      .populate("categoryId", "name")
      .populate("serviceId", "name rating title_color"); 
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
    const userId = req.userId;

    const post = await Post.findById(req.params.id);
    if (!post || post.userId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized access to post" });
    }

    let imageUrls = post.images;
    if (req.files && req.files.length > 0) {
      for (const imageUrl of imageUrls) {
        const publicId = imageUrl.split("/").pop().split(".")[0];
        await deleteImage(publicId);
      }

      imageUrls = [];
      for (const file of req.files) {
        const result = await uploadImage(file.path);
        imageUrls.push(result.secure_url);
        fs.unlinkSync(file.path);
      }
    }

    post.title = req.body.title;
    post.description = req.body.description;
    post.price = req.body.price;
    post.location = req.body.location;
    post.area = req.body.area;
    post.categoryId = req.body.categoryId;
    post.servicesId = req.body.servicesId;
    post.images = imageUrls;

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const userId = req.userId;

    const post = await Post.findById(req.params.id);
    if (!post || post.userId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized access to post" });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
