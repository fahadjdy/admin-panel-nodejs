import fs from "fs";
import path from "path";
import CategoryModel from "../../models/CategoryModel.js";
import { slugify } from "../../utils/helper.function.js";

class CategoryController {
  static async getCategories(req, res) {
    try {
      const categories = await CategoryModel.getAll();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async createCategory(req, res) {
    try {
      const { parent_id, name, description, status } = req.body;
      let image = req.file ? `/uploads/categories/${req.file.filename}` : null;
      const slug = slugify(name);

      const newId = await CategoryModel.create({
        parent_id,
        name,
        slug,
        description,
        image,
        status,
      });

      res.json({ success: true, message: "Category created", id: newId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { parent_id, name, description, status } = req.body;
      let image = req.body.image || null;

      if (req.file) image = `/uploads/categories/${req.file.filename}`;

      const category = await CategoryModel.getById(id);
      if (!category) return res.status(404).json({ error: "Category not found" });

      const slug = slugify(name);

      await CategoryModel.update(id, {
        parent_id,
        name,
        slug,
        description,
        image,
        status,
      });

      res.json({ success: true, message: "Category updated" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      const category = await CategoryModel.getById(id);
      if (!category) return res.status(404).json({ error: "Category not found" });

      // Delete category image file if exists
      if (category.image) {
        const filePath = path.join(process.cwd(), category.image); // category.image = "/uploads/categories/filename.jpg"
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }

      // Delete category record from DB
      await CategoryModel.delete(id);

      res.json({ success: true, message: "Category deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default CategoryController;
