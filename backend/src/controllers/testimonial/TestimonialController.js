import fs from "fs";
import path from "path";
import TestimonialModel from "../../models/TestimonialModel.js";

class TestimonialController {
  // Get all testimonials
  static async getTestimonials(req, res) {
    try {
      const testimonials = await TestimonialModel.getAll();
      res.json({ success: true, data: testimonials });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  // Get testimonial by ID
  static async getTestimonial(req, res) {
    try {
      const { id } = req.params;
      const testimonial = await TestimonialModel.getById(id);
      if (!testimonial) {
        return res.status(404).json({ success: false, message: "Testimonial not found" });
      }
      res.json({ success: true, data: testimonial });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  // Create testimonial
  static async createTestimonial(req, res) {
    try {
      const { name, designation, message, status, display_order } = req.body;

      let image = req.file ? `/uploads/testimonials/${req.file.filename}` : null;

      const newId = await TestimonialModel.add({
        name,
        designation,
        message,
        image,
        status,
        display_order,
      });

      const testimonial = await TestimonialModel.getById(newId);

      res.json({ success: true, message: "Testimonial created", testimonial });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  // Update testimonial
  static async updateTestimonial(req, res) {
    try {
      const { id } = req.params;
      const { name, designation, message, status, display_order } = req.body;

      const testimonial = await TestimonialModel.getById(id);
      if (!testimonial) {
        return res.status(404).json({ success: false, message: "Testimonial not found" });
      }

      let image = req.body.image || testimonial.image;

      // If new file uploaded, delete old one if exists
      if (req.file) {
        if (testimonial.image) {
          const existingImagePath = path.join(process.cwd(), testimonial.image.replace(/^\//, ""));
          if (fs.existsSync(existingImagePath)) {
            fs.unlinkSync(existingImagePath);
          }
        }
        image = `/uploads/testimonials/${req.file.filename}`;
      }

      await TestimonialModel.update(id, {
        name,
        designation,
        message,
        image,
        status,
        display_order,
      });

      const updated = await TestimonialModel.getById(id);

      res.json({ success: true, message: "Testimonial updated", testimonial: updated });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  // Delete testimonial (hard delete)
  static async deleteTestimonial(req, res) {
    try {
      const { id } = req.params;
      const testimonial = await TestimonialModel.getById(id);
      if (!testimonial) {
        return res.status(404).json({ success: false, message: "Testimonial not found" });
      }
      
      await TestimonialModel.delete(id);

      res.json({ success: true, message: "Testimonial deleted" });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

export default TestimonialController;
