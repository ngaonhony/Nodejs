const axios = require("axios").default;
const CryptoJS = require("crypto-js");
const moment = require("moment");
const qs = require("qs");
const ZaloPay = require("../models/payment.model");


const config = {
  app_id: "2553",
  key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
  key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
  endpoint: "https://sb-openapi.zalopay.vn/v2/create",
};

const payment = async (req, res) => {
  const { amount, paymentId } = req.body;

  const embed_data = {
    redirecturl: "http://localhost:3001/management/manage-post-page",
  };
  const items = [];
  const transID = Math.floor(Math.random() * 1000000);

  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format("YYMMDD")}_${transID}`,
    app_user: "user123",
    app_time: Date.now(),
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: amount,
    callback_url: "http://localhost:3001/management/manage-post-page",
    description: `Lazada - Payment for the order #${transID}`,
    paymentId: paymentId,
  };

  const data = `${config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  try {
    const result = await axios.post(config.endpoint, null, { params: order });
    console.log("ZaloPay response:", result.data);
    const newTransaction = new ZaloPay({
      orderId: order.app_trans_id,
      amount: order.amount,
      paymentId: order.paymentId,
      status: result.data.return_code === 1 ? "success" : "failed",
      paymentMethod:"zalopay",
    });

    await newTransaction.save();

    return res.status(200).json({
      return_code: result.data.return_code,
      return_message: result.data.return_message,
      order_url: result.data.order_url,
      transaction: newTransaction,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Lỗi hệ thống", error: error.message });
  }
};

const callback = (req, res) => {
  let result = {};
  console.log(req.body);
  try {
    let dataStr = req.body.data;
    let reqMac = req.body.mac;

    let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
    console.log("mac =", mac);

    if (reqMac !== mac) {
      result.return_code = -1;
      result.return_message = "mac not equal";
    } else {
      let dataJson = JSON.parse(dataStr, config.key2);
      console.log(
        "update order's status = success where app_trans_id =",
        dataJson["app_trans_id"]
      );

      result.return_code = 1;
      result.return_message = "success";

    }
  } catch (ex) {
    console.log("lỗi:::" + ex.message);
    result.return_code = 0;
    result.return_message = ex.message;
  }

  res.json(result);
};

const checkStatusOrder = async (req, res) => {
  const {  orderId } = req.body;

  let postData = {
    app_id: config.app_id,
    app_trans_id: orderId,
  };

  let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1;
  postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  let postConfig = {
    method: "post",
    url: "https://sb-openapi.zalopay.vn/v2/query",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify(postData),
  };

  try {
    const result = await axios(postConfig);
    console.log(result.data);
    return res.status(200).json(result.data);
  } catch (error) {
    console.log("lỗi");
    console.log(error);
  }
};

module.exports = {
  payment,
  callback,
  checkStatusOrder,
};
