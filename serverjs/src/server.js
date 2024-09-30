const express = require("express");
const mongoose = require("mongoose");
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

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/images", imageRouter);
app.use("/api/categorys", categoryRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/listings", listingRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("sever đã khởi động ......");

  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
