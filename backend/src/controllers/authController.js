import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // set in .env
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h";


// Login user
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ? and is_deleted = 0", [email]);
    if (rows.length === 0) {
      return res.status(400).json({ status: false, message: "Invalid email or password" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: false, message: "Invalid email or password" });
    }

    if(user.status === 'Inactive') {
      return res.status(403).json({ status: false, message: user.remark || "Your account is inactive. Please contact the admin." });
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


export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1️⃣ Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // 2️⃣ Check if user already exists
    const [existing] = await pool.query("SELECT id FROM users WHERE email = ? AND is_deleted = 0", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Insert user into DB
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password, status, created_at) VALUES (?, ?, ?, 'Active', NOW())",
      [name, email, hashedPassword]
    );

    const userId = result.insertId;

    // 5️⃣ Generate JWT token
    const token = jwt.sign(
      { id: userId, name, email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: { id: userId, name, email }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};


// Logout user
export const logout = async (req, res) => {
  try {
    res.json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
