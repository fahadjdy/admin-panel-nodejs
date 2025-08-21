import express from "express";
import UsersController from "../controllers/user/UserController.js";
import { authMiddleware } from  "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register",authMiddleware, UsersController.create);
router.put("/edit/:id", authMiddleware, UsersController.update);
router.delete("/delete/:id", authMiddleware, UsersController.delete);

export default router;
