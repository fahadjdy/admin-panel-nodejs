import pool from "../config/db.js";

class ContactModel {
  static async getContacts(companyId = 1) {
    const [rows] = await pool.query(
      "SELECT * FROM company_contacts WHERE company_id=?",
      [companyId]
    );
    return rows;
  }

  static async addContact(mobile, companyId = 1) {
    return pool.query(
      "INSERT INTO company_contacts (company_id, mobile) VALUES (?, ?)",
      [companyId, mobile]
    );
  }

  static async deleteContact(id) {
    return pool.query("DELETE FROM company_contacts WHERE id=?", [id]);
  }
}

export default ContactModel;
