// src/routes/testimonial.routes.js
import { Router } from "express";
import TestimonialController from "../controllers/testimonial/TestimonialController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { testimonialUpload } from "../multer/testimonialUpload.js";

const router = Router();

// Get all testimonials
router.get("/", authMiddleware,TestimonialController.getTestimonials);

// Get testimonial by ID
router.get("/:id", authMiddleware,TestimonialController.getTestimonial);

// Create testimonial
router.post(
  "/",
  authMiddleware,
  testimonialUpload.single("image"),
  TestimonialController.createTestimonial
);

// Update testimonial
router.put(
  "/:id",
  authMiddleware,
  testimonialUpload.single("image"),
  TestimonialController.updateTestimonial
);

// Delete testimonial
router.delete(
  "/:id",
  authMiddleware,
  TestimonialController.deleteTestimonial
);

export default router;
