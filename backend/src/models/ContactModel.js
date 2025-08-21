import pool from "../config/db.js";

class ContactModel {
  static async getContactById(contact_id) {
    const [rows] = await pool.query(
      "SELECT * FROM contact where id = ?",
      [contact_id]
    );
    return rows;
  }
  
  static async getContactByContact(mobile) {
    const [rows] = await pool.query(
      "SELECT * FROM contact where mobile = ?",
      [mobile]
    );
    return rows;
  }

  static async getContacts() {
    const [rows] = await pool.query(
      "SELECT * FROM contact"
    );
    return rows;
  }

  static async addContact(mobile) {
    return pool.query(
      "INSERT INTO contact ( mobile) VALUES (?)",
      [mobile]
    );
  }

  static async deleteContact(id) {
    return pool.query("DELETE FROM contact WHERE id=?", [id]);
  }
}

export default ContactModel;
