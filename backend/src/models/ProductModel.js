// src/models/ProductModel.js
import pool from "../config/db.js";

class ProductModel {
  static async getAll() {
    const [rows] = await pool.query("SELECT * FROM products ORDER BY id DESC");
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
    return rows[0];
  }

  static async addProduct({ category_id, name, slug, description = null, status = 'active' }) {
    const [result] = await pool.query(
      `INSERT INTO products (category_id, name, slug, description, status)
       VALUES (?, ?, ?, ?, ?)`,
      [category_id, name, slug, description, status]
    );
    return result.insertId;
  }

  static async update(id, { category_id, name, slug, description = null, status }) {
    await pool.query(
      `UPDATE products
       SET category_id = ?, name = ?, slug = ?, description = ?, status = ?, updated_at = NOW()
       WHERE id = ?`,
      [category_id, name, slug, description, status, id]
    );
    return true;
  }

  static async delete(id) {
    await pool.query("DELETE FROM products WHERE id = ?", [id]);
    return true;
  }
}

export default ProductModel;
