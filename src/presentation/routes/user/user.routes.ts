import express from "express";
import { authenticateJWT } from "../../../infrastructure/http/auth.middleware";
import { UserController } from "../../controllers/user/user.controller";

const router = express.Router();

const userController = UserController.makeController();

router.post("/create", userController.create.bind(userController));
router.get("/:username", authenticateJWT, userController.getUserByUsername.bind(userController));
router.post(
  "/deactivate/:username", authenticateJWT,
  userController.deactivateUserByUsername.bind(userController)
);

export default router;
