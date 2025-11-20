import { User } from "../DB/models/user.model.js";
import jwt from "jsonwebtoken";
import { message } from "../utils/messages/index.js";

export const isAuthenticate = async (req, res, next) => {
  // get data from req
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(500)
      .json({ succeess: false, message: "token is required" });
  }
  if (!authorization.startsWith("Bearer")) {
    return res
      .status(400)
      .json({ succeess: false, message: "Invalid Bearer Key" });
  }
  const token = authorization.split(" ")[1];
  const { email, id, iat } = jwt.verify(token, process.env.SECRET_JWT);
  // check user existence
  const userExist = await User.findById(id);
  // if user not exist
  if (!userExist) {
    return res
      .status(404)
      .json({ succeess: false, message: message.user.notFound });
  }
  //pass data from user to req
  if (userExist.Deleted == true) {
    return next(
      new Error("your account is freezed! please,Login First", { cause: 400 })
    );
  }
  if (userExist.datatedAt.getTime() > iat * 1000) {
    return next(new Error("destroyed token", { cause: 400 }));
  }
  req.user = userExist;
  // if user exist
  return next();
};
