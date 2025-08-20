import express from "express";
import ProfileController from "../controllers/profile/ProfileController.js";
import { profileUpload } from "../multer/profileUpload.js";
import { authMiddleware } from  "../middleware/authMiddleware.js";

const router = express.Router();

// Get profile
router.get("/",  ProfileController.getProfile);
router.put("/",authMiddleware,profileUpload.fields([{ name: "logo", maxCount: 1 }, { name: "favicon", maxCount: 1 }]),ProfileController.updateProfile);

export default router;
