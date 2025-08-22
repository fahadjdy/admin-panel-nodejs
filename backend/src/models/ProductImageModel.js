import pool from "../config/db.js";
import fs from "fs";
import path from "path";

class ProductImageModel {
  static table = "product_images";

  // Get images for a product (excluding deleted)
  static async getByProductId(product_id) {
    const [rows] = await pool.query(
      `SELECT * FROM ${this.table} WHERE product_id = ? AND is_deleted = 0 ORDER BY is_primary DESC, id ASC`,
      [product_id]
    );
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query(
      `SELECT * FROM ${this.table} WHERE id = ? AND is_deleted = 0`,
      [id]
    );
    return rows[0] || null;
  }

  static async addProductImage({ product_id, image, is_primary = false }) {
    const [result] = await pool.query(
      `INSERT INTO ${this.table} (product_id, image, is_primary) VALUES (?, ?, ?)`,
      [product_id, image, is_primary]
    );
    return result.insertId;
  }

  static async setPrimary(id, product_id) {
    await pool.query(`UPDATE ${this.table} SET is_primary = FALSE WHERE product_id = ?`, [product_id]);
    await pool.query(`UPDATE ${this.table} SET is_primary = TRUE WHERE id = ?`, [id]);
    return true;
  }

  // Soft delete by id
  static async delete(id) {
    // Mark as deleted instead of removing record
    await pool.query(`UPDATE ${this.table} SET is_deleted = 1, deleted_at = NOW() WHERE id = ?`, [id]);
    return true;
  }

  // Soft delete all images for a product
  static async deleteByProductId(product_id) {
    const images = await this.getByProductId(product_id);
    await pool.query(`UPDATE ${this.table} SET is_deleted = 1, deleted_at = NOW() WHERE product_id = ?`, [product_id]);
  }
}

export default ProductImageModel;
