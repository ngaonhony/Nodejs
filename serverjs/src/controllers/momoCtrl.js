const axios = require("axios").default;
const crypto = require("crypto");
const config = require("../config/config");
const MoMoTransaction = require("../models/payment.model");
const { createPost } = require("./post.controller");
const paymentMoMo = async (req, res) => {
  const { amount, postData } = req.body;

  // Validate amount
  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ message: "Thiếu thông tin amount hoặc amount không hợp lệ" });
  }

  // Extract configuration values
  const {
    accessKey,
    secretKey,
    orderInfo,
    partnerCode,
    redirectUrl,
    ipnUrl,
    requestType,
    extraData,
    orderGroupId,
    autoCapture,
    lang,
  } = config;

  const orderId = `${partnerCode}${Date.now()}`;
  const requestId = orderId;

  // Create raw signature
  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

  // Generate the signature
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  // Prepare the request body
  const requestBody = JSON.stringify({
    partnerCode: "MOMO",
    requestId,
    orderId,
    amount,
    orderInfo,
    redirectUrl,
    ipnUrl,
    lang,
    requestType,
    autoCapture,
    extraData,
    orderGroupId,
    signature,
  });

  // Configure Axios request options
  const options = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/create",
    headers: {
      "Content-Type": "application/json",
    },
    data: requestBody,
  };

  try {
    // Make the request to MoMo API
    const result = await axios(options);
    console.log("MoMo response:", result.data);

    // Save transaction details
    const newTransaction = new MoMoTransaction({
      orderId,
      amount,
      paymentMethod: "momo",
      bankCode: result.data.bankCode || "",
      status: result.data.message === "Thành công." ? "success" : "failed",
    });
    await newTransaction.save();
    return res.status(200).json({
      payUrl: result.data.payUrl,
      message: result.data.message,
      resultCode: result.data.resultCode,
    });
  } catch (error) {
    console.error("Error during MoMo payment:", error);
    return res.status(500).json({ statusCode: 500, message: error.message });
  }
};

const callbackMoMo = async (req, res) => {
  console.log("callback: ");
  console.log(req.body);
  return res.status(  204).json(req.body);
};

const checkStatusTransactionMoMo = async (req, res) => {
  const { orderId } = req.body;

  var secretKey = config.secretKey;
  var accessKey = config.accessKey;
  const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;

  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = JSON.stringify({
    partnerCode: "MOMO",
    requestId: orderId,
    orderId: orderId,
    signature: signature,
    lang: "vi",
  });

  const options = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/query",
    headers: {
      "Content-Type": "application/json",
    },
    data: requestBody,
  };

  try {
    const result = await axios(options);
    return res.status(200).json(result.data);
  } catch (error) {
    return res.status(500).json({ statusCode: 500, message: error.message });
  }
};

module.exports = {
  paymentMoMo,
  callbackMoMo,
  checkStatusTransactionMoMo,
};
