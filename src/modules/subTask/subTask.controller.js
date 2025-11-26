import { Router } from "express";
import {
  deleteSubTasks,
  doneSubTasks,
  getSubTasks,
  setSubTask,
  updateSubTasks,
} from "./subTask.service.js";
import { isAuthenticate } from "../../middlewares/auth.middleware.js";
import {
  getTaskValidation,
  IDTaskValidation,
  subTaskValidation,
  updateTaskValidation,
} from "./subTask.validation.js";
import { isValid } from "../../middlewares/validation.middleware.js";

const router = Router();

router.post("/task", isValid(subTaskValidation), isAuthenticate, setSubTask);
router.get(
  "/gettask/:id",
  isValid(getTaskValidation),
  isAuthenticate,
  getSubTasks
);
router.patch(
  "/update/:id",
  isValid(updateTaskValidation),
  isAuthenticate,
  updateSubTasks
);
router.patch(
  "/done/:id",
  isValid(IDTaskValidation),
  isAuthenticate,
  doneSubTasks
);
router.delete(
  "/delete/:id",
  isValid(IDTaskValidation),
  isAuthenticate,
  deleteSubTasks
);

export default router;
