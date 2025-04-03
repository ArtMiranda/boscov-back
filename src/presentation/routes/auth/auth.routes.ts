import express from "express";
import { AuthController } from "../../controllers/auth/auth.controller";

const router = express.Router();
const authController = AuthController.makeController();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints related to user authentication
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     description: Authenticates a user and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized - Invalid credentials
 */
router.post("/login", authController.login.bind(authController));

/**
 * @swagger
 * /api/auth/change-password:
 *   post:
 *     summary: Change user password
 *     tags: [Authentication]
 *     description: Changes the password for a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               currentPassword:
 *                 type: string
 *                 example: "oldpassword123"
 *               newPassword:
 *                 type: string
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Invalid request data
 */
router.post("/change-password", authController.changePassword.bind(authController));

export default router;
