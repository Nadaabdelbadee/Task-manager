import { User } from "../../DB/models/user.model.js";
import { sendEmail } from "../../utils/sendEmail.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { generateToken } from "../../utils/token/generate-token.js";
import { verifyToken } from "../../utils/token/verify-token.js";
import { hash } from "../../utils/hash/hash.js";
import { compare } from "../../utils/hash/compare.js";
import { message } from "../../utils/messages/index.js";

// register service
export const register = asyncHandler(async (req, res, next) => {
  //get data from body
  const { name, email, password, birthOfDate, gender } = req.body;
  //greate user
  const user = await User.create({
    name,
    email,
    password: hash({ data: password }),
    birthOfDate,
    gender,
  });
  const token = generateToken({
    payload: { id: user._id },
    options: { expiresIn: "5m" },
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
    return next(new Error(message.email.notSend, { cause: 500 }));
  }

  //return response
  return res
    .status(201)
    .json({ success: true, message: message.user.createdUser, user });
});

// login service
export const login = asyncHandler(async (req, res, next) => {
  // get data from req
  const { email, password } = req.body;
  // check email
  const userExist = await User.findOne({ email });
  if (!userExist) {
    return next(new Error(message.email.notFound, { cause: 401 }));
  }
  if (userExist.isConfirmed == false) {
    return next(new Error(message.email.verify, { cause: 400 }));
  }
  if (userExist.Deleted == true) {
    await User.updateOne({ _id: userExist._id }, { Deleted: false });
  }
  // check password
  const passMatch = compare({ data: password, hashData: userExist.password });
  if (!passMatch) {
    return next(new Error(message.password.invalid, { cause: 401 }));
  }
  //generate token
  const token = generateToken({
    payload: { email, id: userExist._id },
    options: { expiresIn: "1y" },
  });
  //send response
  return res
    .status(200)
    .json({ success: true, message: message.user.login, token });
});

//activateAccount service
export const activateAccount = asyncHandler(async (req, res, next) => {
  //get data from req
  const { token } = req.params;
  const { id, error } = verifyToken({ token });
  if (error) return next(error);
  if (!(await User.findByIdAndUpdate(id, { isConfirmed: true }))) {
    return next(new Error(message.user.notFound, { cause: 404 }));
  }
  return res
    .status(200)
    .json({ success: true, message: message.email.confirmed });
});
