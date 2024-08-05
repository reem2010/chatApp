// routes/auth.js
import { Router } from "express";
import * as userController from "../controllers/userController.js";
import verifyToken from "../middleWare/authMiddleware.js";

const router = Router();
router.get("/", verifyToken, userController.userData);
router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/logout", userController.logout);
export default router;
