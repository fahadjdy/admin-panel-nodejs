// models/CategoryModel.js
import pool from "../config/db.js";

class CategoryModel {
  // Get all categories (excluding deleted)
  static async getAll() {
    const [rows] = await pool.query(
      "SELECT * FROM categories WHERE is_deleted = 0 ORDER BY id DESC"
    );
    return rows;
  }

  // Get category by ID
  static async getById(id) {
    const [rows] = await pool.query(
      "SELECT * FROM categories WHERE id = ? AND is_deleted = 0",
      [id]
    );
    return rows[0];
  }

  // Get category by slug
  static async getBySlug(slug) {
    const [rows] = await pool.query(
      "SELECT * FROM categories WHERE slug = ? AND is_deleted = 0",
      [slug]
    );
    return rows[0];
  }

  // Create new category
  static async create({
    parent_id = null,
    name,
    slug,
    description = null,
    image = null,
    status = "Active",
  }) {
    const [result] = await pool.query(
      `INSERT INTO categories (parent_id, name, slug, description, image, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [parent_id, name, slug, description, image, status]
    );
    return result.insertId;
  }

  // Update category
  static async update(id, { parent_id = null, name, slug, description = null, image = null, status }) {
    await pool.query(
      `UPDATE categories 
       SET parent_id = ?, name = ?, slug = ?, description = ?, image = ?, status = ?, updated_at = NOW()
       WHERE id = ? AND is_deleted = 0`,
      [parent_id, name, slug, description, image, status, id]
    );
    return true;
  }

  // Soft delete category
  static async delete(id) {
    await pool.query(
      `UPDATE categories 
       SET is_deleted = 1, deleted_at = NOW() 
       WHERE id = ?`,
      [id]
    );
    return true;
  }
}

export default CategoryModel;
