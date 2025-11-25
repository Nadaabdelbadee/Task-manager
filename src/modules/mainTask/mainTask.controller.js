import { Router } from "express";
import {
  dalateMainTaskValidation,
  mainTaskValidation,
  updateMainTaskValidation,
} from "./mainTask.validation.js";
import {
  deleteMainTask,
  getMainTasks,
  setMainTask,
  updateMainTask,
} from "./mainTask.service.js";
import { isValid } from "../../middlewares/validation.middleware.js";
import { isAuthenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/task", isValid(mainTaskValidation), setMainTask);
router.get("/gettask", isAuthenticate, getMainTasks);
router.patch(
  "/update/:id",
  isValid(updateMainTaskValidation),
  isAuthenticate,
  updateMainTask
);
router.delete(
  "/delete/:id",
  isValid(dalateMainTaskValidation),
  isAuthenticate,
  deleteMainTask
);

export default router;
