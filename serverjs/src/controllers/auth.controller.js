const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

const {
  sendVerificationEmail,
  sendResetPasswordEmail,
} = require("../utils/email");
const winston = require("winston");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
      balance: user.balance,
      phone: user.phone,
      address: user.address,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

exports.register = async (req, res) => {
  const { email, password, name, phone, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email đã được sử dụng" });

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Mật khẩu phải chứa ít nhất 6 ký tự, bao gồm 1 ký tự in hoa và 1 ký tự đặc biệt",
      });
    }

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const user = new User({
      email,
      password,
      name,
      phone,
      role,
      verificationCode,
    });

    await user.save();
    await sendVerificationEmail(email, verificationCode);

    res.status(201).json({
      message: "Đăng ký thành công, vui lòng kiểm tra email để xác thực",
    });
  } catch (error) {
    res.status(500).json({ message: "Có lỗi xảy ra", error: error.message });
  }
};

exports.login = asyncHandler(async (req, res) => {
  const { email, phone, password } = req.body;
  const user = await User.findOne({
    $or: [{ email }, { phone }],
  }).select("+password");

  if (!user) {
    return res.status(401).json({
      message: "Email, số điện thoại hoặc mật khẩu không chính xác",
    });
  }

  if (!user.verified) {
    return res.status(403).json({ message: "Tài khoản chưa được xác thực" });
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(401).json({
      message: "Email, số điện thoại hoặc mật khẩu không chính xác",
    });
  }

  const token = generateToken(user);

  res.status(200).json({
    message: "Đăng nhập thành công",
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      balance: user.balance,
      phone: user.phone,
      password: user.password,
      address: user.address,
    },
  });

  winston.info(`Người dùng ${user.email} đã đăng nhập từ IP: ${req.ip}`);
});

// Đăng xuất người dùng
exports.logout = asyncHandler((req, res) => {
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Đăng xuất thành công" });
  winston.info(`Người dùng đã đăng xuất từ IP: ${req.ip}`);
});

// Xác thực email
exports.verifyEmail = asyncHandler(async (req, res) => {
  const { verificationCode } = req.body;
  const user = await User.findOne({ verificationCode });

  if (!user) {
    return res.status(404).json({ message: "Mã xác thực không hợp lệ" });
  }

  user.verified = true;
  user.verificationCode = undefined;
  await user.save();

  winston.info(`Xác thực email thành công cho người dùng: ${user.email}`);
  res.status(200).json({ message: "Xác thực email thành công" });
});

// Quên mật khẩu
exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "Email không tồn tại" });
  }

  if (!user.verified) {
    return res.status(400).json({ message: "Tài khoản chưa được xác thực" });
  }

  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();
  user.verificationCode = verificationCode;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 giờ
  await user.save();
  await sendResetPasswordEmail(email, verificationCode);

  winston.info(`Gửi mã khôi phục mật khẩu cho người dùng: ${email}`);
  res
    .status(200)
    .json({ message: "Vui lòng kiểm tra email để đặt lại mật khẩu" });
});

// Đặt lại mật khẩu
exports.resetPassword = asyncHandler(async (req, res) => {
  const { verificationCode, password } = req.body;
  const user = await User.findOne({
    verificationCode: verificationCode,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({
      message: "Mã khôi phục mật khẩu không hợp lệ hoặc đã hết hạn",
    });
  }

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  user.password = await bcrypt.hash(password, salt);
  user.verificationCode = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  winston.info(`Người dùng ${user.email} đã đặt lại mật khẩu thành công`);
  res.status(200).json({ message: "Đặt lại mật khẩu thành công" });
});
