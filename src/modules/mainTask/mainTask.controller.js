import { Router } from "express";
import * as VS from "./mainTask.validation.js";
import * as MT from "./mainTask.service.js";
import { isValid } from "../../middlewares/validation.middleware.js";
import { isAuthenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/task", isValid(VS.mainTValid), MT.createMainTask);
router.get("/gettask", isAuthenticate, MT.getMainTasks);
router.patch(
  "/update/:id",
  isValid(VS.updateMainTValid),
  isAuthenticate,
  MT.updateMainTask
);
router.patch(
  "/percentage/:id",
  isValid(VS.IDMTaskValid),
  isAuthenticate,
  MT.percentageMainTasks
);
router.patch(
  "/sDate/:id",
  isValid(VS.sDateMainTValid),
  isAuthenticate,
  MT.startDate
);
router.post(
  "/eDate/:id",
  isValid(VS.eDateMainTValid),
  isAuthenticate,
  MT.endDate
);
router.delete(
  "/delete/:id",
  isValid(VS.IDMTaskValid),
  isAuthenticate,
  MT.deleteMainTask
);

export default router;
