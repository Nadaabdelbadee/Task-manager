import { User } from "../../DB/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../utils/sendEmail.js";
// register service
export const register = async (req, res, next) => {
  try {
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
      return res
        .status(500)
        .json({ success: false, message: "Email not send PLZ try again!" });
    }

    //return response
    return res
      .status(201)
      .json({ success: true, message: "User created successfully", user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
};
// login service
export const login = async (req, res, next) => {
  try {
    // get data from req
    const { email, password } = req.body;
    // check email
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res
        .status(401)
        .json({ success: false, message: "email not found" });
    }
    if (userExist.isConfirmed == false) {
      return res
        .status(400)
        .json({ success: false, message: "verify your email first!" });
    }
    // check password
    const passMatch = bcrypt.compareSync(password, userExist.password);
    if (!passMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }
    //generate token
    const token = jwt.sign(
      { email, id: userExist._id },
      process.env.SECRET_JWT,
      { expiresIn: "1y" }
    );
    //send response
    return res
      .status(200)
      .json({ success: true, message: "Login Successfully", token });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
};

//activateAccount service
export const activateAccount = async (req, res, next) => {
  try {
    //get data from req
    const { token } = req.params;
    const { id } = jwt.verify(token, process.env.SECRET_JWT);
    if (!(await User.findByIdAndUpdate(id, { isConfirmed: true }))) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "email confirmed successfully 🎉" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
};
