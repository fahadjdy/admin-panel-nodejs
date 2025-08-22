import { Router } from "express";
import ProductController from "../controllers/product/ProductController.js";
import { authMiddleware } from  "../middleware/authMiddleware.js";
import { productUpload } from "../multer/productUpload.js";

const router = Router();

// Get all products (with images)
router.get("/", ProductController.getAll);

// Get single product by ID (with images)
router.get("/:id", ProductController.getById);

// Add new product with multiple images
router.post(
  "/",
  authMiddleware,
  productUpload.array("images", 10),
  ProductController.addProduct
);

// Update product details
router.put(
  "/:id", 
  authMiddleware, 
  ProductController.update
);

// Delete product 
router.delete("/:id", authMiddleware, ProductController.delete);

// Add product image
router.post("/images/:id", authMiddleware, productUpload.array("images",10), ProductController.addProductImage);

// Set primary image
router.put("/image/primary/:id/:product_id", authMiddleware, ProductController.setPrimaryImage);

// Delete image
router.delete("/image/:id", authMiddleware, ProductController.deleteImage);

export default router;