const express = require("express");
const router = express.Router();
const request = require("request");
const moment = require("moment");
const Transaction = require("../models/payment.model");
const querystring = require("qs");
const crypto = require("crypto");
const config = require("config");

router.get("/", (req, res) => {
  res.render("orderlist", { title: "Danh sách đơn hàng" });
});

router.get("/create_payment_url", (req, res) => {
  res.render("order", { title: "Tạo mới đơn hàng", amount: 10000 });
});

router.get("/querydr", (req, res) => {
  res.render("querydr", { title: "Truy vấn kết quả thanh toán" });
});

router.get("/refund", (req, res) => {
  res.render("refund", { title: "Hoàn tiền giao dịch thanh toán" });
});

router.post("/create_payment_url", (req, res) => {
  process.env.TZ = "Asia/Ho_Chi_Minh";

  const date = new Date();
  const createDate = moment(date).format("YYYYMMDDHHmmss");
  const ipAddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  const tmnCode = config.get("vnp_TmnCode");
  const secretKey = config.get("vnp_HashSecret");
  const vnpUrl = config.get("vnp_Url");
  const returnUrl = config.get("vnp_ReturnUrl");
  const orderId = moment(date).format("DDHHmmss");
  const amount = req.body.amount;
  const bankCode = req.body.bankCode || "";

  const locale = req.body.language || "vn";
  const currCode = "VND";
  const vnp_Params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: tmnCode,
    vnp_Locale: locale,
    vnp_CurrCode: currCode,
    vnp_TxnRef: orderId,
    vnp_OrderInfo: "Thanh toan cho ma GD:" + orderId,
    vnp_OrderType: "other",
    vnp_Amount: amount * 100,
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
  };

  if (bankCode) {
    vnp_Params.vnp_BankCode = bankCode;
  }

  const sortedParams = sortObject(vnp_Params);
  const signData = querystring.stringify(sortedParams, { encode: false });
  const signed = crypto.createHmac("sha512", secretKey).update(Buffer.from(signData, "utf-8")).digest("hex");
  sortedParams.vnp_SecureHash = signed;

  const fullUrl = `${vnpUrl}?${querystring.stringify(sortedParams, { encode: false })}`;
  res.json({ paymentUrl: fullUrl });
});

router.get("/vnpay_return", async (req, res) => {
  try {
    const vnp_Params = req.query;
    const secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    const sortedParams = sortObject(vnp_Params);
    const signData = querystring.stringify(sortedParams, { encode: false });
    const secretKey = config.get("vnp_HashSecret");
    const signed = crypto.createHmac("sha512", secretKey).update(Buffer.from(signData, "utf-8")).digest("hex");

    if (secureHash === signed) {
      const newTransaction = new Transaction({
        orderId: vnp_Params["vnp_TxnRef"],
        amount: vnp_Params["vnp_Amount"],
        transactionId: vnp_Params["vnp_TransactionNo"],
        bankCode: vnp_Params["vnp_BankCode"],
        status: vnp_Params["vnp_ResponseCode"],
        createdAt: new Date(),
      });

      await newTransaction.save();
      res.json({
        code: "00",
        message: "Thanh toán thành công!",
        transaction: newTransaction,
      });
    } else {
      res.json({ code: "97", message: "Thông tin giao dịch không hợp lệ" });
    }
  } catch (error) {
    console.error("Error in vnpay_return:", error);
    res.status(500).json({ code: "99", message: "Lỗi hệ thống" });
  }
});

router.get("/vnpay_ipn", (req, res) => {
  const vnp_Params = req.query;
  const secureHash = vnp_Params["vnp_SecureHash"];

  const orderId = vnp_Params["vnp_TxnRef"];
  const rspCode = vnp_Params["vnp_ResponseCode"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  const sortedParams = sortObject(vnp_Params);
  const secretKey = config.get("vnp_HashSecret");
  const signData = querystring.stringify(sortedParams, { encode: false });
  const signed = crypto.createHmac("sha512", secretKey).update(Buffer.from(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    // Logic to update payment status in your database
    if (rspCode === "00") {
      res.status(200).json({ RspCode: "00", Message: "Success" });
    } else {
      res.status(200).json({ RspCode: "00", Message: "Success" });
    }
  } else {
    res.status(200).json({ RspCode: "97", Message: "Checksum failed" });
  }
});

router.post("/querydr", (req, res) => {
  process.env.TZ = "Asia/Ho_Chi_Minh";
  const date = new Date();

  const vnp_TmnCode = config.get("vnp_TmnCode");
  const secretKey = config.get("vnp_HashSecret");
  const vnp_Api = config.get("vnp_Api");

  const vnp_TxnRef = req.body.orderId;
  const vnp_TransactionDate = req.body.transDate;

  const vnp_RequestId = moment(date).format("HHmmss");
  const vnp_Version = "2.1.0";
  const vnp_Command = "querydr";
  const vnp_OrderInfo = "Truy van GD ma:" + vnp_TxnRef;

  const vnp_IpAddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const vnp_CreateDate = moment(date).format("YYYYMMDDHHmmss");

  const data = `${vnp_RequestId}|${vnp_Version}|${vnp_Command}|${vnp_TmnCode}|${vnp_TxnRef}|${vnp_TransactionDate}|${vnp_CreateDate}|${vnp_IpAddr}|${vnp_OrderInfo}`;

  const vnp_SecureHash = crypto.createHmac("sha512", secretKey).update(Buffer.from(data, "utf-8")).digest("hex");

  const dataObj = {
    vnp_RequestId,
    vnp_Version,
    vnp_Command,
    vnp_TmnCode,
    vnp_TxnRef,
    vnp_OrderInfo,
    vnp_TransactionDate,
    vnp_CreateDate,
    vnp_IpAddr,
    vnp_SecureHash,
  };

  request({
    url: vnp_Api,
    method: "POST",
    json: true,
    body: dataObj,
  }, (error, response, body) => {
    if (error) {
      console.error("Error during request:", error);
      return res.status(500).json({ message: "Error during request" });
    }
    res.json(body);
  });
});

router.post("/refund", (req, res) => {
  process.env.TZ = "Asia/Ho_Chi_Minh";
  const date = new Date();

  const vnp_TmnCode = config.get("vnp_TmnCode");
  const secretKey = config.get("vnp_HashSecret");
  const vnp_Api = config.get("vnp_Api");

  const vnp_TxnRef = req.body.orderId;
  const vnp_TransactionDate = req.body.transDate;
  const vnp_Amount = req.body.amount * 100;
  const vnp_TransactionType = req.body.transType;
  const vnp_CreateBy = req.body.user;

  const vnp_RequestId = moment(date).format("HHmmss");
  const vnp_Version = "2.1.0";
  const vnp_Command = "refund";
  const vnp_OrderInfo = "Hoan tien GD ma:" + vnp_TxnRef;

  const vnp_IpAddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const vnp_CreateDate = moment(date).format("YYYYMMDDHHmmss");
  const vnp_TransactionNo = "0";

  const data = `${vnp_RequestId}|${vnp_Version}|${vnp_Command}|${vnp_TmnCode}|${vnp_TransactionType}|${vnp_TxnRef}|${vnp_Amount}|${vnp_TransactionNo}|${vnp_TransactionDate}|${vnp_CreateBy}|${vnp_CreateDate}|${vnp_IpAddr}|${vnp_OrderInfo}`;
  const vnp_SecureHash = crypto.createHmac("sha512", secretKey).update(Buffer.from(data, "utf-8")).digest("hex");

  const dataObj = {
    vnp_RequestId,
    vnp_Version,
    vnp_Command,
    vnp_TmnCode,
    vnp_TransactionType,
    vnp_TxnRef,
    vnp_Amount,
    vnp_TransactionNo,
    vnp_CreateBy,
    vnp_OrderInfo,
    vnp_TransactionDate,
    vnp_CreateDate,
    vnp_IpAddr,
    vnp_SecureHash,
  };

  request({
    url: vnp_Api,
    method: "POST",
    json: true,
    body: dataObj,
  }, (error, response, body) => {
    if (error) {
      console.error("Error during refund request:", error);
      return res.status(500).json({ message: "Error during refund request" });
    }
    res.json(body);
  });
});

function sortObject(obj) {
  return Object.keys(obj)
    .sort()
    .reduce((acc, key) => {
      acc[key] = encodeURIComponent(obj[key]).replace(/%20/g, "+");
      return acc;
    }, {});
}

module.exports = router;