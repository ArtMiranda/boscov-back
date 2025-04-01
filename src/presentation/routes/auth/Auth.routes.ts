import express from "express";
import { AuthController } from "../../controllers/auth/Auth.controller";

const router = express.Router();

const authController = AuthController.makeController();

router.post("/login", authController.login.bind(authController));

export default router;
