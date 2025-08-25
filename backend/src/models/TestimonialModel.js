import pool from "../config/db.js";

class TestimonialModel {
  // Get all testimonials
  static async getAll() {
    const [rows] = await pool.query(
        "SELECT * FROM testimonial WHERE is_deleted = 0 ORDER BY display_order ASC, id DESC"
        );
    return rows;
  }

  // Get testimonial by ID
  static async getById(id) {
    const [rows] = await pool.query(
    "SELECT * FROM testimonial WHERE id = ? AND is_deleted = 0",
    [id]
    );
    return rows[0];
  }

  // Add new testimonial
  static async add({ name, designation = null, message, image = null, status = "Draft", display_order = 0 }) {
    const [result] = await pool.query(
      `INSERT INTO testimonial (name, designation, message, image, status, display_order)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, designation, message, image, status, display_order]
    );
    return result.insertId;
  }

  // Update testimonial
  static async update(id, { name, designation = null, message, image = null, status, display_order = 0 }) {
    await pool.query(
      `UPDATE testimonial
       SET name = ?, designation = ?, message = ?, image = ?, status = ?, display_order = ?, updated_at = NOW()
       WHERE id = ?`,
      [name, designation, message, image, status, display_order, id]
    );
    return true;
  }

  // Delete testimonial (hard delete since no is_deleted column)
  static async delete(id) {
    await pool.query(
        `UPDATE testimonial 
        SET is_deleted = 1, deleted_at = NOW()
        WHERE id = ?`,
        [id]
    );
    return true;
  }
}

export default TestimonialModel;
