// src/models/ClientsModel.js
import pool from "../config/db.js";

class ClientsModel {
  // Get all clients (excluding deleted)
  static async getAll() {
    const [rows] = await pool.query(
      "SELECT * FROM clients WHERE is_deleted = 0 ORDER BY display_order ASC, id DESC"
    );
    return rows;
  }

  // Get client by ID
  static async getById(id) {
    const [rows] = await pool.query(
      "SELECT * FROM clients WHERE id = ? AND is_deleted = 0",
      [id]
    );
    return rows[0];
  }

  // Add new client
  static async create({ name, logo, website = null, status = "Draft", display_order = 0 }) {
    const [result] = await pool.query(
      `INSERT INTO clients (name, logo, website, status, display_order)
       VALUES (?, ?, ?, ?, ?)`,
      [name, logo, website, status, display_order]
    );
    return result.insertId;
  }

  // Update client
  static async update(id, { name, logo, website, status, display_order }) {
    const fields = [];
    const values = [];

    if (name !== undefined) { fields.push("name = ?"); values.push(name); }
    if (logo !== undefined) { fields.push("logo = ?"); values.push(logo); }
    if (website !== undefined) { fields.push("website = ?"); values.push(website); }
    if (status !== undefined) { fields.push("status = ?"); values.push(status); }
    if (display_order !== undefined) { fields.push("display_order = ?"); values.push(display_order); }

    if (fields.length === 0) return false;

    values.push(id);

    await pool.query(
      `UPDATE clients
       SET ${fields.join(", ")}, updated_at = NOW()
       WHERE id = ? AND is_deleted = 0`,
      values
    );

    return true;
  }

  // Soft delete client
  static async delete(id) {
    await pool.query(
      `UPDATE clients
       SET is_deleted = 1, deleted_at = NOW()
       WHERE id = ?`,
      [id]
    );
    return true;
  }
}

export default ClientsModel;
