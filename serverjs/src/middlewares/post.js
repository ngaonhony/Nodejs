const Post = require("../models/post.model");

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  res.status(403).json({ message: "Access denied. Admins only." });
};

exports.isOwnerOrAdmin = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (
      req.user &&
      (req.user.role === "admin" ||
        post.userId.toString() === req.user._id.toString())
    ) {
      return next();
    }

    res.status(403).json({
      message: "Access denied. Only owner or admin can perform this action.",
    });
  } catch (error) {
    console.error("Error checking permissions:", error);
    res.status(500).json({ message: "Error checking permissions", error });
  }
};
