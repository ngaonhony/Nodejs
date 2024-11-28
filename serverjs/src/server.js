const express = require("express");
const app = express();
const axios = require('axios').default;
const CryptoJS = require('crypto-js');
const moment = require('moment');
const winston = require("winston");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const initRoutes = require("./routers/index");

dotenv.config();
const PORT = process.env.PORT || 3000;
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("combined"));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS", "PUT"],
  })
);

// Thông tin cấu hình ZaloPay
const config = {
    app_id: "2553",
    key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
    key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
    endpoint: "https://sb-openapi.zalopay.vn/v2/create"
};

// API endpoint để xử lý thanh toán
app.post("/payment", async (req, res) => {
  const embed_data = {
      redirecturl: "https://pcrender.com"
  };

  const items = [{}];
  const transID = Math.floor(Math.random() * 1000000);

  // Sửa lại cú pháp template string
  const order = {
      app_id: config.app_id,
      app_trans_id: `${moment().format('YYMMDD')}_${transID}`,  // Sử dụng backticks (`) cho template string
      app_user: "user123",
      app_time: Date.now(), // Thời gian giao dịch
      item: JSON.stringify(items), // Thông tin sản phẩm
      embed_data: JSON.stringify(embed_data), // Thông tin phụ
      amount: 50000, // Số tiền thanh toán
      description: `Lazada - Payment for the order #${transID}`, // Mô tả đơn hàng
      bank_code: "", // Mã ngân hàng (nếu có)
  };

  // Tạo MAC (Message Authentication Code) để bảo mật dữ liệu
  const data = `${config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  // Gửi yêu cầu tới API ZaloPay
  try {
      const result = await axios.post(config.endpoint, null, { params: order });
      console.log(result.data);
      res.json(result.data); // Trả lại kết quả từ ZaloPay
  } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Payment request failed" });
  }
});

// Callback xử lý sau khi ZaloPay gửi kết quả
app.post('/callback', (req, res) => {
  let result = {};

  try {
    let dataStr = req.body.data;
    let reqMac = req.body.mac;

    // Tạo MAC từ dữ liệu trả về
    let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
    console.log("mac =", mac);

    // Kiểm tra callback hợp lệ (đến từ ZaloPay server)
    if (reqMac !== mac) {
      // Callback không hợp lệ
      result.return_code = -1;
      result.return_message = "mac not equal";
    } else {
      // Thanh toán thành công, cập nhật trạng thái đơn hàng
      let dataJson = JSON.parse(dataStr);
      console.log("update order's status = success where app_trans_id =", dataJson["app_trans_id"]);

      result.return_code = 1;
      result.return_message = "success";
    }
  } catch (ex) {
    result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
    result.return_message = ex.message;
  }

  // Thông báo kết quả cho ZaloPay server
  res.json(result);
});

// Khởi động server và lắng nghe
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Cấu hình logging bằng winston
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

// Logging request
app.use((req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url}`);
  next();
});

// Error handler
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send("Something went wrong!");
});
