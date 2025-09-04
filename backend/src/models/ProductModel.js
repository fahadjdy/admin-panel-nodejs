import pool from "../config/db.js";

class ProductModel {
  // Get all products (excluding deleted)
  static async getAll(searchObj, limit, offset, orderColumn = "id", orderDir = "DESC") {
    const { search, filter } = searchObj;
    let query = "SELECT id, category_id, name, slug, description, status, created_at, updated_at FROM products WHERE is_deleted = 0";
    const params = [];

    // Search by name or description
    if (search) {
      query += " AND (name LIKE ? OR description LIKE ?)";
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm);
    }

    // Filters
    if (filter) {
      if (filter.category) {
        query += " AND category_id = ?";
        params.push(filter.category);
      }
      if (filter.status) {
        query += " AND status = ?";
        params.push(filter.status);
      }
      if (filter.slug) {
        query += " AND slug = ?";
        params.push(filter.slug);
      }
      if (filter.name) {
        query += " AND name = ?";
        params.push(filter.name);
      }
    }

    // Ordering and pagination
    query += ` ORDER BY ${orderColumn} ${orderDir} LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const [rows] = await pool.query(query, params);
    return rows;
  }

  static async getTotalCount(filterObj = {}) {
    const { search, filter } = filterObj;

    let query = "SELECT COUNT(*) as total FROM products WHERE is_deleted = 0";
    const params = [];

    if (search) {
      query += " AND (name LIKE ? OR description LIKE ?)";
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm);
    }

    if (filter) {
      if (filter.category_id) {
        query += " AND category_id = ?";
        params.push(filter.category_id);
      }
      if (filter.status) {
        query += " AND status = ?";
        params.push(filter.status);
      }
    }

    const [rows] = await pool.query(query, params);
    return rows[0].total;
  }

  
  // Get product by ID
  static async getById(id) {
    const [rows] = await pool.query(
      "SELECT * FROM products WHERE id = ? AND is_deleted = 0",
      [id]
    );
    return rows[0];
  }

  // Add new product
  static async addProduct({ category_id, name, slug, description = null, status = 'active' }) {
    const [result] = await pool.query(
      `INSERT INTO products (category_id, name, slug, description, status)
       VALUES (?, ?, ?, ?, ?)`,
      [category_id, name, slug, description, status]
    );
    return result.insertId;
  }

  // Update product
  static async update(id, { category_id, name, slug, description = null, status }) {
    await pool.query(
      `UPDATE products
       SET category_id = ?, name = ?, slug = ?, description = ?, status = ?, updated_at = NOW()
       WHERE id = ? AND is_deleted = 0`,
      [category_id, name, slug, description, status, id]
    );
    return true;
  }

  // Soft delete product
  static async delete(id) {
    await pool.query(
      `UPDATE products 
       SET is_deleted = 1, deleted_at = NOW()
       WHERE id = ?`,
      [id]
    );
    return true;
  }

    static async getBySlug(slug) {
    const [rows] = await pool.query(
      "SELECT * FROM products WHERE slug = ? AND is_deleted = 0",
      [slug]
    );
    return rows[0];
  }
}

export default ProductModel;
