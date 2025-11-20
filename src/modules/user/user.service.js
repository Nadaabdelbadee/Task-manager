import { User } from "../../DB/models/user.model.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { message } from "../../utils/messages/index.js";

export const getProfile = asyncHandler(async (req, res, next) => {
  //get data from req
  const userExist = req.user;
  return res.status(200).json({ succeess: true, data: userExist });
});

export const freezeAccount = asyncHandler(async (req, res, next) => {
  //get data from req
  await User.updateOne({ _id: req.user._id }, { Deleted: true  , datatedAt:Date.now()});
  return res
    .status(200)
    .json({ succeess: true, message: message.user.deletedUser });
});
