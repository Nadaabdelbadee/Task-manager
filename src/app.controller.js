import connectDB from "./DB/connectDB.js";
import authRouter from "./modules/auth/auth.controller.js";
import userRouter from "./modules/user/user.controller.js";
import { globalError } from "./utils/globalError.js";
const bootstrap = async (app, express) => {
  app.use(express.json());
  await connectDB();
  app.use("/auth", authRouter);
  app.use("/user", userRouter);

  app.get((req, res, next) => {
    return next(new Error("Invalid URL", { cause: 404 }));
  });
  
  app.use(globalError);
};

export default bootstrap;
