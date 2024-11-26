const express = require("express");
const app = express();
const axios = require('axios').default;
const CryptoJS = require('crypto-js');
const moment = require('moment');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" +order.item;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    // Gửi yêu cầu tới API ZaloPay
    try {
        const result = await axios.post(config.endpoint, null, { params: order });
        console.log(result.data);
    } catch (error) {
        console.log(error.message);
    }
})

app.post('/callback', (req, res) => {
    let result = {};
  
    try {
      let dataStr = req.body.data;
      let reqMac = req.body.mac;
  
      let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
      console.log("mac =", mac);
  
  
      // kiểm tra callback hợp lệ (đến từ ZaloPay server)
      if (reqMac !== mac) {
        // callback không hợp lệ
        result.return_code = -1;
        result.return_message = "mac not equal";
      }
      else {
        // thanh toán thành công
        // merchant cập nhật trạng thái cho đơn hàng
        let dataJson = JSON.parse(dataStr, config.key2);
        console.log("update order's status = success where app_trans_id =", dataJson["app_trans_id"]);
  
        result.return_code = 1;
        result.return_message = "success";
      }
    } catch (ex) {
      result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
      result.return_message = ex.message;
    }
  
    // thông báo kết quả cho ZaloPay server
    res.json(result);
  });

app.listen(5000, ()=>{
    console.log("server run at port 5000");
})
