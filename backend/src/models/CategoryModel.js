// models/CategoryModel.js
import pool from "../config/db.js";

class CategoryModel {
  static async getAll() {
    const [rows] = await pool.query("SELECT * FROM categories ORDER BY id DESC");
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query("SELECT * FROM categories WHERE id = ?", [id]);
    return rows[0];
  }

  static async create({ parent_id = null, name, slug, description = null, image = null, status = 'active' }) {
    const [result] = await pool.query(
      `INSERT INTO categories (parent_id, name, slug, description, image, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [parent_id, name, slug, description, image, status]
    );
    return result.insertId;
  }

  static async update(id, { parent_id = null, name, slug, description = null, image = null, status }) {
    await pool.query(
      `UPDATE categories 
       SET parent_id = ?, name = ?, slug = ?, description = ?, image = ?, status = ?
       WHERE id = ?`,
      [parent_id, name, slug, description, image, status, id]
    );
    return true;
  }

  static async delete(id) {
    await pool.query("DELETE FROM categories WHERE id = ?", [id]);
    return true;
  }
}

export default CategoryModel;
