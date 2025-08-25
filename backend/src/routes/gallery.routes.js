// src/routes/gallery.routes.js
import { Router } from "express";
import GalleryController from "../controllers/gallery/GalleryController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { galleryUpload } from "../multer/galleryUpload.js";

const router = Router();

// Get all gallery items
router.get("/", GalleryController.getAll);

// Create new gallery item
router.post(
  "/",
  authMiddleware,
  galleryUpload.single("image"),
  GalleryController.create
);

// Delete gallery item
router.delete("/:id", authMiddleware, GalleryController.delete);

export default router;
