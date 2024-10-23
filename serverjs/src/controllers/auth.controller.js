const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
  const { email, password, name, address, phone, role } = req.body;
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

    const phoneRegex = /^0[35789]\d{8}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        message:
          "Số điện thoại phải có 10 chữ số, bắt đầu bằng 0 và theo sau là các số 3, 5, 7, 8, hoặc 9",
      });
    }

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const user = new User({
      email,
      password,
      name,
      address,
      phone,
      role,
      verificationCode,
    });

    await user.save();
    await sendVerificationEmail(email, verificationCode);

    const token = generateToken(user);
    res.status(201).json({
      message: "Đăng ký thành công, vui lòng kiểm tra email để xác thực",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        balance: user.balance,
        phone: user.phone,
        role: user.role,
        address: user.address,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Có lỗi xảy ra", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    const user = await User.findOne({
      $or: [{ email }, { phone }],
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Email, số điện thoại hoặc mật khẩu không chính xác",
      });
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
        role: user.role,
        address: user.address,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Có lỗi xảy ra", error: error.message });
  }
};

exports.logout = (req, res) => {
  try {
    res.status(200).json({ message: "Đăng xuất thành công" });
  } catch (error) {
    res.status(500).json({ message: "Có lỗi xảy ra", error: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  const { verificationCode } = req.body;
  try {
    const user = await User.findOne({ verificationCode });

    if (!user) {
      return res.status(404).json({ message: "Mã xác thực không hợp lệ" });
    }

    user.verified = true;
    user.verificationCode = undefined;
    await user.save();

    winston.info(`Xác thực email thành công cho người dùng: ${user.email}`);

    res.status(200).json({ message: "Xác thực email thành công" });
  } catch (error) {
    winston.error("Lỗi xác thực email: ", error);
    res.status(500).json({ message: "Có lỗi xảy ra", error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
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
  } catch (error) {
    winston.error("Lỗi quên mật khẩu: ", error);
    res.status(500).json({ message: "Có lỗi xảy ra", error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
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

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.verificationCode = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    winston.info(`Người dùng ${user.email} đã đặt lại mật khẩu thành công`);

    res.status(200).json({ message: "Đặt lại mật khẩu thành công" });
  } catch (error) {
    winston.error("Lỗi đặt lại mật khẩu: ", error);
    res.status(500).json({ message: "Có lỗi xảy ra", error: error.message });
  }
};
