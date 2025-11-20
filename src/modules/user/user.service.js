import { asyncHandler } from "../../utils/async-handler.js";

export const getProfile = asyncHandler(async (req, res, next) => {
  //get data from req
  const userExist = req.user;
  return res.status(200).json({ succeess: true, data: userExist });
});


export const freezeAccount = asyncHandler(async (req, res, next) => {
  //get data from req
  const userExist = req.user;
  return res.status(200).json({ succeess: true, data: userExist });
});
