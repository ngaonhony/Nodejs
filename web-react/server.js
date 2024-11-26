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

app.listen(5000, ()=>{
    console.log("server run at port 5000");
})
