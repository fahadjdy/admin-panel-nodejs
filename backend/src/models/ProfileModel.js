import pool from "../config/db.js";

class ProfileModel {
  static async getProfile() {
    const [rows] = await pool.query("SELECT * FROM profile WHERE id=1");
    return rows[0] || {};
  }

  static async updateProfile(data) {
    const fields = ["name", "email", "company_name", "about_us", "slogan", "logo", "favicon"];
    const updates = [];
    const params = [];

    fields.forEach((field) => {
      if (data[field] !== undefined && data[field] !== null) {
        updates.push(`${field}=?`);
        params.push(data[field]);
      }
    });

    const sql = `UPDATE profile SET ${updates.join(", ")}, updated_at=NOW() WHERE id=1`;
    return pool.query(sql, params);
  }
}

export default ProfileModel;
