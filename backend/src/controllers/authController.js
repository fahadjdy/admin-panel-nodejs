import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // set in .env
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h";

// Register user
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({status: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
      name,
      email,
      hashedPassword
    ]);

    res.json({ success: true, message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Login user
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(400).json({ status: false, message: "Invalid email or password" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: false, message: "Invalid email or password" });
    }

     // ✅ Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION } 
    );

    res.json({ success: true, message: "Login successful", token: token });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Logout user
export const logout = async (req, res) => {
  try {
   // ✅ Destroy session
    req.session.destroy();

    res.json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
