import express from "express";
import { authenticateJWT } from "../../../infrastructure/http/auth.middleware";
import { AuthController } from "../../controllers/auth/auth.controller";

const router = express.Router();
const authController = AuthController.makeController();

router.post("/login", authController.login.bind(authController));

router.post(
  "/change-password",
  authenticateJWT,
  authController.changePassword.bind(authController)
);

export default router;
