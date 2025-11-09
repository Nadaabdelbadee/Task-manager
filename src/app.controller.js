import connectDB from "./DB/connectDB.js";
import authRouter from "./modules/auth/auth.controller.js";
const bootstrap = async (app, express) => {
  app.use(express.json());
  await connectDB();
  app.use("/auth", authRouter);


  app.get((req, res, next) => {
    return res.status(404).json({
      success: false,
      message: "Invalid Url",
    });
  });
};

export default bootstrap;
