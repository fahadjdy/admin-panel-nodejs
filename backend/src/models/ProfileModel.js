import pool from "../config/db.js";

class ProfileModel {
  // Create profile for a new user
  static async create(user_id) {
    const sql = `
      INSERT INTO profile (user_id)
      VALUES (?)
    `;
    const [result] = await pool.query(sql, [user_id]);
    return result.insertId;
  }

  // Update profile
  static async update(id, data) {

    const fields = [
      "owner_name",
      "email",
      "company_name",
      "about_company",
      "slogan",
      "logo",
      "favicon",
      "is_maintainance"
    ];

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

    const sql = `UPDATE profile SET ${updates.join(", ")}, updated_at = NOW() WHERE id = ?`;
    params.push(id);

    const [result] = await pool.query(sql, params);
    return result;
  }

  // Delete profile
  static async delete(id) {
    const [result] = await pool.query("DELETE FROM profile WHERE id = ?", [id]);
    return result;
  }

  // Find profile by profile ID
  static async findById(id) {
    const [rows] = await pool.query("SELECT * FROM profile WHERE id = ?", [id]);
    return rows[0] || null;
  }

  // Find profile by user ID (common case)
  static async findByUserId(user_id) {
    const [rows] = await pool.query("SELECT * FROM profile WHERE user_id = ?", [user_id]);
    return rows[0] || null;
  }

  // Find profile by email
  static async findByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM profile WHERE email = ?", [email]);
    return rows[0] || null;
  }
}

export default ProfileModel;
