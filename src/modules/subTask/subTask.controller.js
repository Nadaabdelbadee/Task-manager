import { Router } from "express";
import * as ST from "./subTask.service.js";
import { isAuthenticate } from "../../middlewares/auth.middleware.js";
import * as VS from "./subTask.validation.js";
import { isValid } from "../../middlewares/validation.middleware.js";

const router = Router();

router.post("/task", isValid(VS.subTValid), isAuthenticate, ST.createSubTask);
router.get(
  "/gettask/:id",
  isValid(VS.getSTValid),
  isAuthenticate,
  ST.getSubTasks
);
router.patch(
  "/update/:id",
  isValid(VS.updateSTValid),
  isAuthenticate,
  ST.updateSubTasks
);
router.patch(
  "/done/:id",
  isValid(VS.IDSTValid),
  isAuthenticate,
  ST.doneSubTasks
);
router.patch(
  "/sDate/:id",
  isValid(VS.sDateSTValid),
  isAuthenticate,
  ST.startDate
);
router.patch(
  "/eDate/:id",
  isValid(VS.eDateSTValid),
  isAuthenticate,
  ST.endDate
);
router.delete(
  "/delete/:id",
  isValid(VS.IDSTValid),
  isAuthenticate,
  ST.deleteSubTasks
);

export default router;
