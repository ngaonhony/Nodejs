const userRouter = require("./userRouters");
const categoryRouter = require("./categoryRouters");
const feedbackRouter = require("./feedbackRouters");
const postRouter = require("./postRouters");
const authRouter = require("./authRouter");
const serviceRouter = require("./serviceRouters");
const zaloPayRouter = require("./zaloPayRoute");
const momoRouter = require("./momoRoute");
const paymentRouter = require("./paymentRouters");
const initRoutes = (app) => {
  app.use("/api/users", userRouter);
  app.use("/api/categories", categoryRouter);
  app.use("/api/feedbacks", feedbackRouter);
  app.use("/api/posts", postRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/services", serviceRouter);
  app.use("/api/zaloPay", zaloPayRouter);
  app.use("/api/momo", momoRouter);
  app.use("/api/payments", paymentRouter);
  app.get("/", (req, res) => {
    res.send("Server đã khởi động ......");
  });
};

module.exports = initRoutes;
