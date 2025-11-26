import { MainTask } from "../../DB/models/mainTask.model.js";
import { SubTask } from "../../DB/models/subTask.model.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { message } from "../../utils/messages/index.js";

// add new sub task ==============================================
export const setSubTask = asyncHandler(async (req, res, next) => {
  const { subName, mainTaskId } = req.body;
  const mainTaskExist = await MainTask.findById(mainTaskId);
  if (!mainTaskExist)
    return next(new Error(message.mainTask.notFound, { cause: 404 }));
  await SubTask.create({ subName, mainTaskId });
  return res
    .status(201)
    .json({ success: true, message: message.subTask.created });
});
// get all sub task ==============================================
export const getSubTasks = asyncHandler(async (req, res, next) => {
  const mainTaskExist = await MainTask.findById(req.params.id);
  if (!mainTaskExist)
    return next(new Error(message.mainTask.notFound, { cause: 404 }));
  const allSubTasks = await SubTask.find({
    mainTaskId: mainTaskExist._id,
  });
  return res.status(200).json({ success: true, message: allSubTasks });
});
// update sub task ==============================================
export const updateSubTasks = asyncHandler(async (req, res, next) => {
  const { subName } = req.body;
  const subTaskExist = await SubTask.findById(req.params.id);
  if (!subTaskExist) return next(new Error(message.subTask.notFound));
  await SubTask.updateOne({ subName });
  return res
    .status(200)
    .json({ success: true, message: message.subTask.updated });
});
// delete sub task ==============================================
export const deleteSubTasks = asyncHandler(async (req, res, next) => {
  const subTaskExist = await SubTask.findById(req.params.id);
  if (!subTaskExist) return next(new Error(message.subTask.notFound));
  await SubTask.deleteOne({ _id: subTaskExist._id });
  return res
    .status(200)
    .json({ success: true, message: message.subTask.deleted });
});
