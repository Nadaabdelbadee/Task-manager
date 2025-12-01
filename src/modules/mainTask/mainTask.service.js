import { MainTask } from "../../DB/models/mainTask.model.js";
import { SubTask } from "../../DB/models/subTask.model.js";
import { User } from "../../DB/models/user.model.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { message } from "../../utils/messages/index.js";

//  set main task ==================================================
export const createMainTask = asyncHandler(async (req, res, next) => {
  const { TaskName, userId } = req.body;
  const userIdExist = await User.findById(userId);
  if (!userIdExist)
    return next(new Error(message.user.notFound, { cause: 404 }));
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

// percentage main task ==============================================
export const percentageMainTasks = asyncHandler(async (req, res, next) => {
  const mainTaskExist = await MainTask.findById(req.params.id);
  if (!mainTaskExist)
    return next(new Error(message.mainTask.notFound, { cause: 404 }));
  const doneSubtasks = await SubTask.find({
    mainTaskId: mainTaskExist._id,
    done: true,
  });
  const percentageNumber =
    (doneSubtasks.length / mainTaskExist.subTasks.length) * 100;
  const percentage = await MainTask.updateOne({
    donePercentage: percentageNumber,
  });
  return res
    .status(200)
    .json({ success: true, message: mainTaskExist.donePercentage });
});
// start date main task ==============================================
export const startDate = asyncHandler(async (req, res, next) => {
  const mainTaskExist = await MainTask.findById(req.params.id);
  if (!mainTaskExist)
    return next(new Error(message.mainTask.notFound, { cause: 404 }));
  const sDate = await MainTask.updateOne({ startDate: req.body });
  return res.status(200).json({ success: true, message: sDate });
});
// end date main task ==============================================
export const endDate = asyncHandler(async (req, res, next) => {
  const mainTaskExist = await MainTask.findById(req.params.id);
  if (!mainTaskExist)
    return next(new Error(message.mainTask.notFound, { cause: 404 }));
  if (new Date(req.body.endDate) <= new Date(mainTaskExist.startDate)) {
    return next(new Error("End date must be after start date", { cause: 400 }));
  }
  const eDate = await MainTask.findByIdAndUpdate(
    req.params.id,
    { endDate: req.body.endDate },
    { new: true }
  );
  return res.status(200).json({ success: true, message: eDate });
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
