import fs from "fs";
import path from "path";
import CategoryModel from "../../models/CategoryModel.js";
import { slugify } from "../../utils/helper.function.js";

class CategoryController {
  // Get all categories
  static async getCategories(req, res) {
    try {
      const categories = await CategoryModel.getAll();
      res.json({ success: true, data: categories });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  // Create category
  static async createCategory(req, res) {
    try {
      const { parent_id, name, description, status } = req.body;
      if (parent_id && Number(parent_id) === Number(req.params?.id)) {
        return res.status(400).json({ success: false, message: "Category cannot be its own parent" });
      }

      const slug = slugify(name);
      let image = req.file ? `/uploads/categories/${req.file.filename}` : null;

      const is_exist = await CategoryModel.isAlreadyExist(slug,parent_id);
      if (is_exist) {
        const uploadedFilePath = path.join(process.cwd(), "uploads/categories", req.file.filename);
        if (fs.existsSync(uploadedFilePath)) {
          fs.unlinkSync(uploadedFilePath);
        }
        return res.status(400).json({ success: false, message: "Category already exists" });
      }

      const newId = await CategoryModel.create({
        parent_id: parent_id || null,
        name,
        slug,
        description,
        image,
        status,
      });

      const category = await CategoryModel.getById(newId);

      res.json({ success: true, message: "Category created", category });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  // Update category
  static async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { parent_id, name, description, status } = req.body;
      const slug = slugify(name);
      const category = await CategoryModel.getById(id);
      if (!category) {
        return res.status(404).json({ success: false, message: "Category not found" });
      }

      if (parent_id && Number(parent_id) === Number(id)) {
        return res.status(400).json({ success: false, message: "Category cannot be its own parent" });
      }

      let image = req.body.image || category.image;

      // If new file uploaded, delete old one if exists
      if (req.file) {
        if (category.image) {
          const existingImagePath = path.join(process.cwd(), category.image.replace(/^\//, "")); 
          // remove leading "/" to get correct path
          if (fs.existsSync(existingImagePath)) {
            fs.unlinkSync(existingImagePath);
          }
        }
        image = `/uploads/categories/${req.file.filename}`;
      }

      

      await CategoryModel.update(id, {
        parent_id: parent_id || null,
        name,
        slug,
        description,
        image,
        status,
      });

      res.json({ success: true, message: "Category updated",category });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }


  // Soft delete category
  static async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      const category = await CategoryModel.getById(id);
      if (!category) return res.status(404).json({ success: false, message: "Category not found" });

      // Soft delete instead of hard delete
      await CategoryModel.delete(id);

      res.json({ success: true, message: "Category deleted." });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

export default CategoryController;
