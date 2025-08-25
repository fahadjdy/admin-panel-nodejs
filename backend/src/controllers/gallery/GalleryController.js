// src/controllers/gallery/GalleryController.js
import GalleryModel from "../../models/GalleryModel.js";

class GalleryController {
  // Get all gallery items
  static async getAll(req, res) {
    try {
      const items = await GalleryModel.getAll();
      res.json({ success: true, data: items });
    } catch (error) {
      console.error("Error fetching gallery:", error);
      res.status(500).json({ success: false, message: "Failed to fetch gallery" });
    }
  }

  // Create new gallery item
  static async create(req, res) {
    try {
      const { title, description, status = "Draft", display_order = 0 } = req.body;
      const image = req.file ? req.file.path : null;

      if (!image) {
        return res.status(400).json({ success: false, message: "Image is required" });
      }

      const id = await GalleryModel.create({ title, description, image, status, display_order });

      res.status(201).json({ success: true, message: "Gallery item created", id });
    } catch (error) {
      console.error("Error creating gallery item:", error);
      res.status(500).json({ success: false, message: "Failed to create gallery item" });
    }
  }

  // Delete gallery item
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const is_exist = await GalleryModel.getById(id);
        if (!is_exist)  return res.status(404).json({ success: false, message: "Gallery item not found" });
      await GalleryModel.delete(id);
      res.json({ success: true, message: "Gallery item deleted" });
    } catch (error) {
      console.error("Error deleting gallery item:", error);
      res.status(500).json({ success: false, message: "Failed to delete gallery item" });
    }
  }
}

export default GalleryController;
