import { Router } from "express";
import * as userService from "./user.service.js";
import { isAuthenticate } from "../../middlewares/auth.middleware.js";
const router = Router();
router.get("/profile",isAuthenticate, userService.getProfile);

export default router;
