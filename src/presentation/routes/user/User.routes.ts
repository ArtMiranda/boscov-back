import express from "express";
import { UserController } from "../../controllers/user/User.controller";

const router = express.Router();

const userController = UserController.makeController();

router.post("/create", userController.create.bind(userController));
router.get("/:username", userController.getUserByUsername.bind(userController));
router.post("/deactivate/:username", userController.deactivateUserByUsername.bind(userController));

export default router;
