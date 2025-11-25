import { MainTask } from "../../DB/models/mainTask.model.js";
import { User } from "../../DB/models/user.model.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { message } from "../../utils/messages/index.js";

//  set main task ==================================================
export const setMainTask = asyncHandler(async (req, res, next) => {
  const { TaskName, userId } = req.body;
  const userIdExist = await User.findById(userId);
  if (!userIdExist) return next(new Error(message.user.notFound));
  await MainTask.create({ TaskName, userId });
  return res
    .status(201)
    .json({ success: true, message: message.mainTask.created });
});

// get main task ===================================================
export const getMainTasks = asyncHandler(async (req, res, next) => {
  const allMainTasks = await MainTask.find({ userId: req.user._id });
  return res.status(200).json({ success: true, message: allMainTasks });
});

// update main task ================================================
export const updateMainTask = asyncHandler(async (req, res, next) => {
  const { TaskName } = req.body;
  const mainTaskExist = await MainTask.findById(req.params.id);
  if (!mainTaskExist)
    return next(new Error(message.mainTask.notFound, { cause: 404 }));
  if (req.user._id.toString() != mainTaskExist.userId.toString())
    return next(new Error("not allowed!"));

  await MainTask.updateOne({ TaskName });
  return res
    .status(200)
    .json({ success: true, message: message.mainTask.updated });
});
// delete main task ================================================
export const deleteMainTask = asyncHandler(async (req, res, next) => {
  const mainTaskExist = await MainTask.findById(req.params.id);
  if (!mainTaskExist)
    return next(new Error(message.mainTask.notFound, { cause: 404 }));
  if (req.user._id.toString() != mainTaskExist.userId.toString())
    return next(new Error("not allowed!"));
  await MainTask.deleteOne({ _id: req.params.id });
  return res
    .status(200)
    .json({ success: true, message: message.mainTask.deleted });
});
