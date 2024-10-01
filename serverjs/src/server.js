const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRouter = require("./routers/user.routers");
const imageRouter = require("./routers/imageRouters");
const categoryRouter = require("./routers/categoryRouters");
const reviewRouter = require("./routers/reviewRouters");
const listingRouter = require("./routers/listingRouters");
const authRouter = require("./routers/authRouter");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/images", imageRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/listings", listingRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("sever đã khởi động ......");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
