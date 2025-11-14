import { User } from "../../DB/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../utils/sendEmail.js";
import { asyncHandler } from "../../utils/async-handler.js";

// register service
export const register = asyncHandler(async (req, res, next) => {
  //get data from body
  const { name, email, password, birthOfDate, gender } = req.body;
  //greate user
  const user = await User.create({
    name,
    email,
    password: bcrypt.hashSync(password, 8),
    birthOfDate,
    gender,
  });
  const token = jwt.sign({ id: user._id }, process.env.SECRET_JWT, {
    expiresIn: "5m",
  });
  const link = `http://localhost:3000/auth/activate-account/${token}`;
  const isSent = await sendEmail({
    to: email,
    subject: "Verify Account",
    html: `<h1>To varify Account --> </h1>
      <p>Plz enter on this link to verify your account <a href=${link}>link</a> </p>
      <p>Note: Link is expired in 5 minute</p>`,
  });
  if (!isSent) {
    return next(new Error("Email not send PLZ try again!", { cause: 500 }));
  }

  //return response
  return res
    .status(201)
    .json({ success: true, message: "User created successfully", user });
});

// login service
export const login = asyncHandler(async (req, res, next) => {
  // get data from req
  const { email, password } = req.body;
  // check email
  const userExist = await User.findOne({ email });
  if (!userExist) {
    return next(new Error("email not found", { cause: 401 }));
  }
  if (userExist.isConfirmed == false) {
    return next(new Error("verify your email first!", { cause: 400 }));
  }
  // check password
  const passMatch = bcrypt.compareSync(password, userExist.password);
  if (!passMatch) {
    return next(new Error("Invalid password", { cause: 401 }));
  }
  //generate token
  const token = jwt.sign({ email, id: userExist._id }, process.env.SECRET_JWT, {
    expiresIn: "1y",
  });
  //send response
  return res
    .status(200)
    .json({ success: true, message: "Login Successfully", token });
});

//activateAccount service
export const activateAccount = asyncHandler(async (req, res, next) => {
  //get data from req
  const { token } = req.params;
  const { id } = jwt.verify(token, process.env.SECRET_JWT);
  if (!(await User.findByIdAndUpdate(id, { isConfirmed: true }))) {
    return next(new Error("User not found", { cause: 404 }));
  }
  return res
    .status(200)
    .json({ success: true, message: "email confirmed successfully 🎉" });
});
