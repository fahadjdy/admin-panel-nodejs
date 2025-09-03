import pool from "../config/db.js";

class ProductModel {
  // Get all products (excluding deleted)
  static async getAll(limit, offset) {
    const [rows] = await pool.query(
      "SELECT * FROM products WHERE is_deleted = 0 ORDER BY id DESC LIMIT ? OFFSET ?",
      [limit, offset]
    );
    return rows;
  }

  // total count 
  static async getTotalCount() {
    const [rows] = await pool.query(
      "SELECT COUNT(*) as total FROM products WHERE is_deleted = 0"
    );
    return rows[0].total;
  }
  
  // Get product by ID
  static async getById(id) {
    const [rows] = await pool.query(
      "SELECT * FROM products WHERE id = ? AND is_deleted = 0",
      [id]
    );
    return rows[0];
  }

  // Add new product
  static async addProduct({ category_id, name, slug, description = null, status = 'active' }) {
    const [result] = await pool.query(
      `INSERT INTO products (category_id, name, slug, description, status)
       VALUES (?, ?, ?, ?, ?)`,
      [category_id, name, slug, description, status]
    );
    return result.insertId;
  }

  // Update product
  static async update(id, { category_id, name, slug, description = null, status }) {
    await pool.query(
      `UPDATE products
       SET category_id = ?, name = ?, slug = ?, description = ?, status = ?, updated_at = NOW()
       WHERE id = ? AND is_deleted = 0`,
      [category_id, name, slug, description, status, id]
    );
    return true;
  }

  // Soft delete product
  static async delete(id) {
    await pool.query(
      `UPDATE products 
       SET is_deleted = 1, deleted_at = NOW()
       WHERE id = ?`,
      [id]
    );
    return true;
  }

    static async getBySlug(slug) {
    const [rows] = await pool.query(
      "SELECT * FROM products WHERE slug = ? AND is_deleted = 0",
      [slug]
    );
    return rows[0];
  }
}

export default ProductModel;
