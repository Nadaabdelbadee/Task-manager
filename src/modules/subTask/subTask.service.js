import { MainTask } from "../../DB/models/mainTask.model.js";
import { SubTask } from "../../DB/models/subTask.model.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { message } from "../../utils/messages/index.js";

// add new sub task ==============================================
export const createSubTask = asyncHandler(async (req, res, next) => {
  const { subName, mainTaskId } = req.body;
  const mainTaskExist = await MainTask.findById(mainTaskId);
  if (!mainTaskExist)
    return next(new Error(message.mainTask.notFound, { cause: 404 }));
  const subTask = await SubTask.create({ subName, mainTaskId });
  mainTaskExist.subTasks.push(subTask._id);
  await mainTaskExist.save();
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
  const { subName, mainTaskId  } = req.body; // mainTaskId لازم موجود
  const subTaskExist = await SubTask.findById(req.params.id);
  if (!subTaskExist)
    return next(new Error(message.subTask.notFound, { cause: 404 }));

  // تحقق من تكرار الاسم ضمن نفس MainTask
  const duplicate = await SubTask.findOne({
    subName,
    mainTaskId, 
    _id: { $ne: subTaskExist._id },
  });

  if (duplicate)
    return next(new Error("SubTask name already exists for this Main Task", { cause: 400 }));

  subTaskExist.subName = subName;
  await subTaskExist.save();

  return res.status(200).json({
    success: true,
    message: message.subTask.updated,
    data: subTaskExist,
  });
});
// done sub task ==============================================
export const doneSubTasks = asyncHandler(async (req, res, next) => {
  const subTaskExist = await SubTask.findById(req.params.id);
  if (!subTaskExist) return next(new Error(message.subTask.notFound));
  await SubTask.updateOne({ done: true });
  return res.status(200).json({ success: true, message: "subTask completed" });
});
// start date sub task ==============================================
export const startDate = asyncHandler(async (req, res, next) => {
  const subTaskExist = await SubTask.findById(req.params.id);
  if (!subTaskExist)
    return next(new Error(message.subTask.notFound, { cause: 404 }));
  if (
    new Date(req.body.startDate) >= new Date(subTaskExist.mainTaskId.startDate)
  ) {
    return next(
      new Error("start date must be after start date of main task ", {
        cause: 400,
      })
    );
  }
  const sDate = await SubTask.updateOne({ startDate: req.body });
  return res.status(200).json({ success: true, message: sDate });
});
// end date sub task ==============================================
export const endDate = asyncHandler(async (req, res, next) => {
  const subTaskExist = await SubTask.findById(req.params.id);
  if (!subTaskExist)
    return next(new Error(message.subTask.notFound, { cause: 404 }));
  if (
    new Date(req.body.endDate) <= new Date(subTaskExist.startDate) &&
    new Date(subTaskExist.mainTaskId.endDate)
  ) {
    return next(new Error("End date must be after start date", { cause: 400 }));
  }
  const eDate = await MainTask.findByIdAndUpdate(
    req.params.id,
    { endDate: req.body.endDate },
    { new: true }
  );
  return res.status(200).json({ success: true, message: eDate });
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
