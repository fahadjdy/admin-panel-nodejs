import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import session from "express-session";

import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import addressRoutes from "./routes/address.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import testimonialRoutes from "./routes/testimonial.routes.js";
import galleryRoutes from "./routes/gallery.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(session({
  secret: process.env.SESSION_SECRET,  // replace with env var
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,   // set true if HTTPS
    maxAge: 1000 * 60 * 60 // 1 hour
  }
}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/public", express.static(path.join(process.cwd(), "public")));


// Routes setup
app.use("/api/auth", authRoutes);

// Profile and Address routes
app.use("/api/profile", profileRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/testimonial",  testimonialRoutes);
app.use("/api/gallery",  galleryRoutes);


// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Routes placeholder
app.get("/", (req, res) => {
  res.json({ message: "Backend API running 🚀" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
