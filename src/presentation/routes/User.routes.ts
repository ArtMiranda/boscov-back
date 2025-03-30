import express from "express";
import { UserController } from "../controllers/User.controller";

const router = express.Router();

const userController = UserController.getInstance();

router.post("/create", userController.create.bind(userController));
router.get("/:username", userController.getUserByUsername.bind(userController));
router.post("/deactivate/:username", userController.deactivateUserByUsername.bind(userController));

export default router;
