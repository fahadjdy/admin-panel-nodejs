import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 🔒 Check if header exists and starts with "Bearer"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // 🏷️ Extract token
  const token = authHeader.split(" ")[1];

  try {
    // ✅ Verify token
    const decoded = jwt.verify(token, JWT_SECRET); 
    // 🔑 Attach decoded payload to req.user
    req.user = decoded; // { id, name, email }
    
    next(); // pass control
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
