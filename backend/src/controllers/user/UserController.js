import UsersModel from "../../models/UserModel.js";
import bcrypt from "bcrypt";

class UsersController {
  // Create (Register User)
  static async create(req, res) {
    const { name, email, password } = req.body;
    try {
      // Check if user exists
      const existingUser = await UsersModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ status: false, message: "Email already registered" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const userId = await UsersModel.create({ name, email, password: hashedPassword });

      res.json({ success: true, message: "User registered successfully", userId });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  // Update user
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const data = {};
      if (name) data.name = name;
      if (email) data.email = email;
      if (password) {
        // Hash password only if provided
        data.password = await bcrypt.hash(password, 10);
      }

      const result = await UsersModel.update(id, data);

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: "No fields to update or user not found" });
      }

      res.json({ success: true, message: "User updated successfully", affectedRows: result.affectedRows });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }


  // Delete user
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const user = await UsersModel.findById(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const result = await UsersModel.delete(id);
      res.json({ success: true, message: "User deleted successfully", affectedRows: result.affectedRows });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Get user by ID
  static async findById(req, res) {
    try {
      const { id } = req.params;
      const user = await UsersModel.findById(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Get user by Email
  static async findByEmail(req, res) {
    try {
      const { email } = req.params;
      const user = await UsersModel.findByEmail(email);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default UsersController;
