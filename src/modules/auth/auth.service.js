import { User } from "../../DB/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
