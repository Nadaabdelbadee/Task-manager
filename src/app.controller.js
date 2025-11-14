import connectDB from "./DB/connectDB.js";
import authRouter from "./modules/auth/auth.controller.js";
import userRouter from "./modules/user/user.controller.js";
const bootstrap = async (app, express) => {
  app.use(express.json());
  await connectDB();
  app.use("/auth", authRouter);
  app.use("/user", userRouter);

  app.get((req, res, next) => {
    return next(new Error("Invalid URL", { cause: 404 }));
  });
  app.use((error, req, res, next) => {
    return res
      .status(error.status || 500)
      .json({ success: false, message: error.message, stack: error.stack });
  });
};

export default bootstrap;
