const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "Người dùng không tồn tại" });
      }

      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Mã token đã hết hạn" });
      }
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Mã token không hợp lệ" });
      }
      return res
        .status(500)
        .json({ message: "Lỗi xác thực", error: error.message });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Không có quyền truy cập, vui lòng đăng nhập" });
  }
};

exports.authorize = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return res.status(403).json({ message: "Không có quyền truy cập" });
    }
    next();
  };
};
