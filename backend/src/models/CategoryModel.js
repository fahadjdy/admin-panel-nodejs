// models/CategoryModel.js
import pool from "../config/db.js";

class CategoryModel {
  // Get all categories (excluding deleted)
  static async getAll(searchObj, limit, offset) {
    const { search, filter } = searchObj;

    let query = `
      SELECT id, name, slug, parent_id, status, is_deleted, created_at, updated_at, deleted_at
      FROM categories
      WHERE is_deleted = 0
    `;
    const params = [];

    // Search by name or slug
    if (search) {
      query += " AND (name LIKE ? OR slug LIKE ?)";
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm);
    }

    // Filters
    if (filter) {
      if (filter.name) {
        query += " AND name = ?";
        params.push(filter.name);
      }
      if (filter.slug) {
        query += " AND slug = ?";
        params.push(filter.slug);
      }
      if (filter.parent_id) {
        query += " AND parent_id = ?";
        params.push(filter.parent_id);
      }
      if (filter.status) {
        query += " AND status = ?";
        params.push(filter.status);
      }
    }

    // Ordering and pagination
    query += " ORDER BY id DESC LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const [rows] = await pool.query(query, params);
    return rows;
  }

  // Total count for pagination
  static async getTotalCount(searchObj) {
    const { search, filter } = searchObj;

    let query = "SELECT COUNT(*) as total FROM categories WHERE is_deleted = 0";
    const params = [];

    // Search by name or slug
    if (search) {
      query += " AND (name LIKE ? OR slug LIKE ?)";
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm);
    }

    // Filters
    if (filter) {
      if (filter.name) {
        query += " AND name = ?";
        params.push(filter.name);
      }
      if (filter.slug) {
        query += " AND slug = ?";
        params.push(filter.slug);
      }
      if (filter.parent_id) {
        query += " AND parent_id = ?";
        params.push(filter.parent_id);
      }
      if (filter.status) {
        query += " AND status = ?";
        params.push(filter.status);
      }
    }

    const [rows] = await pool.query(query, params);
    return rows[0].total;
  }


  // Get category by ID
  static async getById(id) {
    const [rows] = await pool.query(
      "SELECT * FROM categories WHERE id = ? AND is_deleted = 0",
      [id]
    );
    return rows[0];
  }

  // Get category by slug
  static async getBySlug(slug) {
    const [rows] = await pool.query(
      "SELECT * FROM categories WHERE slug = ? AND is_deleted = 0",
      [slug]
    );
    return rows[0];
  }

  static async isAlreadyExist(slug, parent_id = null) {
    let query = "";
    let params = [];

    if (parent_id === null) {
      // parent_id is NULL
      query = "SELECT * FROM categories WHERE slug = ? AND parent_id IS NULL AND is_deleted = 0";
      params = [slug];
    } else {
      query = "SELECT * FROM categories WHERE slug = ? AND parent_id = ? AND is_deleted = 0";
      params = [slug, parent_id];
    }

    const [rows] = await pool.query(query, params);
    return rows[0] || null;
  }

  // Create new category
  static async create({
    parent_id = null,
    name,
    slug,
    description = null,
    image = null,
    status = "Active",
  }) {
    const [result] = await pool.query(
      `INSERT INTO categories (parent_id, name, slug, description, image, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [parent_id, name, slug, description, image, status]
    );
    return result.insertId;
  }

  // Update category
  static async update(id, { parent_id = null, name, slug, description = null, image = null, status }) {
    await pool.query(
      `UPDATE categories 
       SET parent_id = ?, name = ?, slug = ?, description = ?, image = ?, status = ?, updated_at = NOW()
       WHERE id = ? AND is_deleted = 0`,
      [parent_id, name, slug, description, image, status, id]
    );
    return true;
  }

  // Soft delete category
  static async delete(id) {
    await pool.query(
      `UPDATE categories 
       SET is_deleted = 1, deleted_at = NOW() 
       WHERE id = ?`,
      [id]
    );
    return true;
  }
}

export default CategoryModel;
