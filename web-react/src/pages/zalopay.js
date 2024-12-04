// Import express và các thư viện cần thiết
const express = require('express');
const app = express();
const port = 3000;

// API route để trả về kết quả JSON
app.get('/transaction', (req, res) => {
  const response = {
    return_code: 1,
    return_message: 'Giao dịch thành công',
    sub_return_code: 1,
    sub_return_message: 'Giao dịch thành công',
    zp_trans_token: 'AC20GSPFx4X0MSYdbaZHfoSw',
    order_url: 'https://qcgateway.zalopay.vn/openinapp?order=eyJ6cHRyYW5zdG9rZW4iOiJBQzIwR1NQRng0WDBNU1lkYmFaSGZvU3ciLCJhcHBpZCI6MjU1M30=',
    order_token: 'AC20GSPFx4X0MSYdbaZHfoSw',
    qr_code: '00020101021226530010vn.zalopay01061800050203001031810569330321051169538620010A00000072701320006970454011899ZP24334O007216770208QRIBFTTA5204739953037045405500005802VN630480E1'
  };

  // Kiểm tra xem có đường link `order_url` không
  if (response.order_url) {
    // Redirect đến order_url
    res.redirect(response.order_url);
  } else {
    // Nếu không có `order_url`, trả về kết quả JSON
    res.json(response);
  }
});

// Khởi động server trên port 3000
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
