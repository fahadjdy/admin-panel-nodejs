import pool from "../config/db.js";

class AddressModel {
  // Get all addresses (ignoring deleted)
  static async getAddresses() {
    const [rows] = await pool.query(
      "SELECT * FROM address WHERE is_deleted = 0"
    );
    return rows;
  }

  // Add a new address (optional fields allowed)
  static async addAddress({ address = null, city = null, state = null, pincode = null, map = null }) {
    return pool.query(
      `INSERT INTO address 
        (address, city, state, pincode, map) 
       VALUES (?, ?, ?, ?, ?)`,
      [address, city, state, pincode, map]
    );
  }

  // Update an address (only updates provided fields)
  static async updateAddress(id, data) {
    const fields = [];
    const values = [];

    // Build dynamic query based on provided fields
    for (const [key, value] of Object.entries(data)) {
      if (["address", "city", "state", "pincode", "map"].includes(key)) {
        fields.push(`${key}=?`);
        values.push(value);
      }
    }

    if (fields.length === 0) return; // nothing to update

    values.push(id);

    const query = `
      UPDATE address 
      SET ${fields.join(", ")}, updated_at=NOW()
      WHERE id=? AND is_deleted=0
    `;

    return pool.query(query, values);
  }

  // Soft delete
  static async deleteAddress(id) {
    return pool.query(
      `UPDATE address 
       SET is_deleted=1, deleted_at=NOW() 
       WHERE id=?`,
      [id]
    );
  }
}

export default AddressModel;
