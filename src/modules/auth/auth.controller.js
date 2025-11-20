import { Router } from "express";
import * as authService from "./auth.service.js";
import { isValid } from "../../middlewares/validation.middleware.js";
import { loginSchema, registerSchema } from "./auth.validation.js";

const router = Router();

//register
router.post("/register", isValid(registerSchema), authService.register);

//login
router.post("/login", isValid(loginSchema), authService.login);

//activate-account
router.get("/activate-account/:token", authService.activateAccount);

export default router;
