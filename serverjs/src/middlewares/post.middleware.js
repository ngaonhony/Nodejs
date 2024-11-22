const Post = require("../models/post.model");

const { validationResult, body } = require("express-validator");

exports.checkPostOwnership = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Bài đăng không tồn tại" });
    }

    if (req.user.role === "admin") {
      return next();
    } else if (
      req.user.role === "user" &&
      post.userId.toString() === req.user.id
    ) {
      return next();
    } else {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền truy cập bài đăng này" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống", error });
  }
};

exports.authorizeRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Không có quyền truy cập" });
    }
    next();
  };
};

exports.validatePostData = [
  body("title")
    .isString()
    .isLength({ max: 100 })
    .withMessage("Tiêu đề không được vượt quá 100 ký tự"),
  body("description")
    .isString()
    .isLength({ max: 1000 })
    .withMessage("Mô tả không được vượt quá 1000 ký tự"),
  body("price").isFloat({ min: 0 }).withMessage("Giá phải là số dương"),
  body("location")
    .isString()
    .notEmpty()
    .withMessage("Vị trí không được để trống"),
  body("area").isFloat({ min: 0 }).withMessage("Diện tích phải là số dương"),
  body("categoryId").isMongoId().withMessage("ID danh mục không hợp lệ"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
