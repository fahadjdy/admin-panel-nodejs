import pool from "../config/db.js";

class AddressModel {
  static async getAddresses(companyId = 1) {
    const [rows] = await pool.query(
      "SELECT * FROM company_addresses WHERE company_id=?",
      [companyId]
    );
    return rows;
  }

  static async addAddress({ address, map_link }, companyId = 1) {
    return pool.query(
      `INSERT INTO company_addresses 
        (company_id, address, map_link) 
       VALUES (?, ?, ?)`,
      [companyId, address, map_link]
    );
  }

  static async updateAddress(id, { address, map_link }) {
    return pool.query(
      `UPDATE company_addresses 
       SET address=?, map_link=?, updated_at=NOW() 
       WHERE id=?`,
      [address, map_link, id]
    );
  }

  static async deleteAddress(id) {
    return pool.query("DELETE FROM company_addresses WHERE id=?", [id]);
  }
}

export default AddressModel;
