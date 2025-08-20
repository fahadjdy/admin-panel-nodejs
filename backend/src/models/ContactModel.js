import pool from "../config/db.js";

class ContactModel {
  static async getContactById(contact_id) {
    const [rows] = await pool.query(
      "SELECT * FROM company_contacts where id = ?",
      [contact_id]
    );
    return rows;
  }
  
  static async getContactByContact(mobile) {
    const [rows] = await pool.query(
      "SELECT * FROM company_contacts where mobile = ?",
      [mobile]
    );
    return rows;
  }

  static async getContacts() {
    const [rows] = await pool.query(
      "SELECT * FROM company_contacts"
    );
    return rows;
  }

  static async addContact(mobile) {
    return pool.query(
      "INSERT INTO company_contacts ( mobile) VALUES (?)",
      [mobile]
    );
  }

  static async deleteContact(id) {
    return pool.query("DELETE FROM company_contacts WHERE id=?", [id]);
  }
}

export default ContactModel;
