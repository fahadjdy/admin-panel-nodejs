// src/routes/category.routes.js
import { Router } from "express";
import CategoryController from "../controllers/category/CategoryController.js";
import { authMiddleware } from  "../middleware/authMiddleware.js";
import { categoryUpload } from "../multer/categoryUpload.js";

const router = Router();

// Get all categories
router.get("/", CategoryController.getCategories);
router.post("/", authMiddleware, categoryUpload.single("image"), CategoryController.createCategory);
router.put("/:id", authMiddleware, categoryUpload.single("image"), CategoryController.updateCategory);
router.delete("/:id", authMiddleware, CategoryController.deleteCategory);

export default router;
