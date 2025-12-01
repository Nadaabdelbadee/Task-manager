import { MainTask } from "../../DB/models/mainTask.model.js";
import { SubTask } from "../../DB/models/subTask.model.js";
import { User } from "../../DB/models/user.model.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { message } from "../../utils/messages/index.js";

export const getProfile = asyncHandler(async (req, res, next) => {
  //get data from req
  const userExist = req.user;
  const mainTasks = await MainTask.find({ userId: userExist._id });
  const mainTasksWithSubs = await Promise.all(
    mainTasks.map(async (task) => {
      const subTasks = await SubTask.find({ mainTaskId: task._id });
      return {
        ...task.toObject(),
        subTasks,
      };
    })
  );
  return res.status(200).json({ succeess: true, data: mainTasksWithSubs });
});

export const freezeAccount = asyncHandler(async (req, res, next) => {
  //get data from req
  await User.updateOne(
    { _id: req.user._id },
    { Deleted: true, deletedAt: Date.now() }
  );
  return res
    .status(200)
    .json({ succeess: true, message: message.user.deleted });
});
