// src/models/ProductImageModel.js
import pool from "../config/db.js";

class ProductImageModel {

  static table = "product_images";
  static async getByProductId(product_id) {
    const [rows] = await pool.query(
      "SELECT * FROM " + table + " WHERE product_id = ? ORDER BY is_primary DESC, id ASC",
      [product_id]
    );
    return rows;
  }

  static async addProductImage({ product_id, image, is_primary = false }) {
    const [result] = await pool.query(
      "INSERT INTO "+table+" (product_id, image, is_primary) VALUES (?, ?, ?)",
      [product_id, image, is_primary]
    );
    return result.insertId;
  }

  static async setPrimary(id, product_id) {
    // Reset all images to false first
    await pool.query("UPDATE "+table+" SET is_primary = FALSE WHERE product_id = ?", [product_id]);
    // Set selected image as primary
    await pool.query("UPDATE "+table+" SET is_primary = TRUE WHERE id = ?", [id]);
    return true;
  }

  static async delete(id) {
    await pool.query("DELETE FROM "+table+" WHERE id = ?", [id]);
    return true;
  }

    static async deleteByProductId(product_id) {
      const images = await this.getByProductId(product_id);
      images.forEach((img) => {
        const filePath = path.join(process.cwd(), img.image);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });
      await db.query("DELETE FROM "+table+" WHERE product_id = ?", [product_id]);
    }

}

export default ProductImageModel;
