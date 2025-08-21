import pool from "../config/db.js";

class UsersModel {
  // Create new user
  static async create({ name, email, password }) {
    const sql = `
      INSERT INTO users (name, email, password)
      VALUES (?, ?, ?)
    `;
    const [result] = await pool.query(sql, [name, email, password]);
    return result.insertId; // return new user id
  }

  // Update user
  static async update(id, data) {
    const fields = ["name", "email", "password"];
    const updates = [];
    const params = [];

    fields.forEach((field) => {
      if (data[field] !== undefined && data[field] !== null) {
        updates.push(`${field} = ?`);
        params.push(data[field]);
      }
    });

    if (updates.length === 0) {
      return { affectedRows: 0 }; // nothing to update
    }

    const sql = `
      UPDATE users
      SET ${updates.join(", ")}, updated_at = NOW()
      WHERE id = ?
    `;
    params.push(id);

    const [result] = await pool.query(sql, params);
    return result;
  }

  // Delete user
  static async delete(id) {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return result;
  }

  // Find by ID
  static async findById(id) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0] || null;
  }

  // Find by Email
  static async findByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0] || null;
  }
}

export default UsersModel;
