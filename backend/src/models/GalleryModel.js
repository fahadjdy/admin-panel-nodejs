// src/models/GalleryModel.js
import pool from "../config/db.js";

class GalleryModel {
  // Get all gallery items (excluding deleted)
  static async getAll() {
    const [rows] = await pool.query(
      "SELECT * FROM gallery WHERE is_deleted = 0 ORDER BY display_order ASC, id DESC"
    );
    return rows;
  }

  // Get gallery item by ID
  static async getById(id) {
    const [rows] = await pool.query(
      "SELECT * FROM gallery WHERE id = ? AND is_deleted = 0",
      [id]
    );
    return rows[0];
  }

  // Add new gallery item
  static async create({ title, description, image, status = "Draft", display_order = 0 }) {
    const [result] = await pool.query(
      `INSERT INTO gallery (title, description, image, status, display_order)
       VALUES (?, ?, ?, ?, ?)`,
      [title, description, image, status, display_order]
    );
    return result.insertId;
  }

  // Update gallery item
  static async update(id, { title, description, image, status, display_order }) {
    const fields = [];
    const values = [];

    if (title !== undefined) { fields.push("title = ?"); values.push(title); }
    if (description !== undefined) { fields.push("description = ?"); values.push(description); }
    if (image !== undefined) { fields.push("image = ?"); values.push(image); }
    if (status !== undefined) { fields.push("status = ?"); values.push(status); }
    if (display_order !== undefined) { fields.push("display_order = ?"); values.push(display_order); }

    if (fields.length === 0) return false;

    values.push(id);

    await pool.query(
      `UPDATE gallery 
       SET ${fields.join(", ")}, updated_at = NOW()
       WHERE id = ? AND is_deleted = 0`,
      values
    );

    return true;
  }

  // Soft delete gallery item
  static async delete(id) {
    await pool.query(
      `UPDATE gallery 
       SET is_deleted = 1, deleted_at = NOW()
       WHERE id = ?`,
      [id]
    );
    return true;
  }
}

export default GalleryModel;
