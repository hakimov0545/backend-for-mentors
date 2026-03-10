import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
	"/register",
	authController.register.bind(authController),
);
router.post("/login", authController.login.bind(authController));
router.get(
	"/me",
	authMiddleware,
	authController.getMe.bind(authController),
);
router.get(
	"/private",
	authMiddleware,
	authController.getPrivate.bind(authController),
);

export default router;
