import { Router } from "express";
import {
  IDMainTaskValidation,
  mainTaskValidation,
  updateMainTaskValidation,
} from "./mainTask.validation.js";
import {
  createMainTask,
  deleteMainTask,
  getMainTasks,
  percentageMainTasks,
  updateMainTask,
} from "./mainTask.service.js";
import { isValid } from "../../middlewares/validation.middleware.js";
import { isAuthenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/task", isValid(mainTaskValidation), createMainTask);
router.get("/gettask", isAuthenticate, getMainTasks);
router.patch(
  "/update/:id",
  isValid(updateMainTaskValidation),
  isAuthenticate,
  updateMainTask
);
router.patch(
  "/percentage/:id",
  isValid(IDMainTaskValidation),
  isAuthenticate,
  percentageMainTasks
);
router.delete(
  "/delete/:id",
  isValid(IDMainTaskValidation),
  isAuthenticate,
  deleteMainTask
);

export default router;
