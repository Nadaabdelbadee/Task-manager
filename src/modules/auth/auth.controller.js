import { Router } from "express";
import * as authService from "./auth.service.js";

const router = Router();

//register
router.post("/register", authService.register);

//login
router.post("/login", authService.login);

//activate-account
router.get("/activate-account/:token", authService.activateAccount);

export default router;
