const express = require("express");
const app = express();
const axios = require("axios").default;
const CryptoJS = require("crypto-js");
const moment = require("moment");
const winston = require("winston");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const initRoutes = require("./routers/index");

dotenv.config();
const PORT = process.env.PORT || 3000;

// Kết nối Database
connectDB();

// Middleware
app.use(express.json()); // Xử lý JSON
app.use(express.urlencoded({ extended: true })); // Xử lý dữ liệu urlencoded
app.use(cookieParser()); // Xử lý cookie
app.use(morgan("combined")); // Logging request HTTP với morgan
app.use(
  cors({
    origin: "*", // Cho phép tất cả các origin (cẩn thận trong môi trường sản xuất)
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS", "PUT"], // Các phương thức HTTP hỗ trợ
  })
);

// Khởi tạo các routes
initRoutes(app);

// ZaloPay Payment Configuration
const config = {
  app_id: "2553",
  key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
  key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
  endpoint: "https://sb-openapi.zalopay.vn/v2/create",
};

// API endpoint để xử lý thanh toán
app.post("/payment", async (req, res) => {
  console.log("Received payment request"); // Kiểm tra nếu yêu cầu đến được API

  const embed_data = {
    redirecturl: "https://pcrender.com", // URL sẽ chuyển hướng sau khi thanh toán
  };

  const items = [{}]; // Dữ liệu sản phẩm
  const transID = Math.floor(Math.random() * 1000000); // Tạo ID giao dịch ngẫu nhiên

  // Tạo đơn hàng
  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format("YYMMDD")}_${transID}`, // Mã giao dịch (dạng YYMMDD_randomID)
    app_user: "user123", // Thông tin người dùng
    app_time: Date.now(), // Thời gian giao dịch
    item: JSON.stringify(items), // Dữ liệu sản phẩm dưới dạng JSON
    embed_data: JSON.stringify(embed_data), // Dữ liệu bổ sung
    amount: 50000, // Số tiền thanh toán
    description: `Lazada - Payment for the order #${transID}`, // Mô tả đơn hàng
    bank_code: "", // Mã ngân hàng (nếu có)
  };

  // Tạo MAC (Message Authentication Code) để bảo mật dữ liệu
  const data = `${config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString(); // Sinh MAC

  try {
    // Gửi yêu cầu đến API ZaloPay
    const result = await axios.post(config.endpoint, null, { params: order });

    console.log("ZaloPay Response:", result.data); // Log kết quả trả về từ ZaloPay
    res.status(200).json(result.data); // Trả về kết quả cho client
  } catch (error) {
    console.error("Error during payment processing:", error.message); // Log lỗi nếu có
    res.status(500).json({ error: "Payment processing failed", details: error.message });
  }
});

// Logging configuration using Winston
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}] - ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

// Logging request using custom middleware
app.use((req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url}`);
  next();
});

// Endpoint kiểm tra nếu server hoạt động bình thường
app.get("/api/test", (req, res) => {
  res.status(200).send("Server is working!");
});

// Error handler middleware (nên để sau các routes và middleware khác)
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server và lắng nghe yêu cầu
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
