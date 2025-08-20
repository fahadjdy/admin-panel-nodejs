import multer from "multer";
import path from "path";
import fs from "fs";
import { ensureFolderExists } from "../utils/helper.function.js";

const uploadPath = "uploads/";
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = "uploads/products";
    ensureFolderExists(folder);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp", "image/svg+xml"];
  cb(null, allowed.includes(file.mimetype));
};

export const productUpload = multer({ storage, fileFilter });
