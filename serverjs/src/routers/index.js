const userRouter = require("./userRouters");
const imageRouter = require("./imageRouters");
const categoryRouter = require("./categoryRouters");
const feedbackRouter = require("./feedbackRouters");
const postRouter = require("./postRouters");
const authRouter = require("./authRouter");

const initRoutes = (app) => {
app.use("/api/users", userRouter);
app.use("/api/images", imageRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/feedbacks", feedbackRouter);
app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);


app.get("/", (req, res) => {
    res.send("sever đã khởi động ......");
  });
}
module.exports = initRoutes;