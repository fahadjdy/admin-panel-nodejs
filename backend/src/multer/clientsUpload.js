// src/multer/clientsUpload.js
import multer from "multer";
import path from "path";
import fs from "fs";
import { ensureFolderExists } from "../utils/helper.function.js";

// Ensure main uploads folder exists
const uploadPath = "uploads/";
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Storage config for client logos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = "uploads/clients";
    ensureFolderExists(folder);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, name);
  },
});

// File filter (only allow images)
const fileFilter = (req, file, cb) => {
  const allowed = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
    "image/svg+xml",
    "image/x-icon",
  ];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Invalid file type"), false);
};

export const clientsUpload = multer({ storage, fileFilter });
