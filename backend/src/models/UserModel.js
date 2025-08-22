import pool from "../config/db.js";  // relative path must be correct

class UsersModel {
  
  // name : string;
  // email : string;
  // password : string;
  // status : Enumerator("Active","Inactive");
  // remark : string;
  
  static allowedFields = ["name", "email", "password","status","remark"];
  
  static async create({ name, email, password }) {

    const sql = `
      INSERT INTO users (name, email, password)
      VALUES (?, ?, ?)
    `;
    console.log(sql);
    const [result] = await pool.query(sql, [name, email, password]);
    return result.insertId; 
  }

  // Update user
  static async update(id, data) {
    const updates = [];
    const params = [];

    // Only include fields that are provided
    for (const key of this.allowedFields) {
      if (data[key] !== undefined && data[key] !== null) {
        updates.push(`${key} = ?`);
        params.push(data[key]);
      }
    }

    if (updates.length === 0) {
      return { affectedRows: 0 }; // nothing to update
    }

    // if status changed to active, clear remark
    if(data['status'] == 'Active'){
      updates.push(`remark = null`);
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
     return pool.query(
      `UPDATE users 
       SET is_deleted=1, deleted_at=NOW() 
       WHERE id=?`,
      [id]
    );
  }

  // Find by ID
  static async findById(id) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ? and is_deleted = 0", [id]);
    return rows[0] || null;
  }

  // Find by Email
  static async findByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ? and is_deleted = 0", [email]);
    return rows[0] || null;
  }
}

export default UsersModel;
