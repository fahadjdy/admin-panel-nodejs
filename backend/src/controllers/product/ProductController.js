// src/controllers/ProductController.js
import ProductModel from "../../models/ProductModel.js";
import ProductImageModel from "../../models/ProductImageModel.js";
import { slugify } from "../../utils/helper.function.js";
import fs from "fs";
import path from "path";

class ProductController {
  static async getAll(req, res) {
    try {
      const products = await ProductModel.getAll();
      const productsWithImages = await Promise.all(
        products.map(async (p) => ({ ...p, images: await ProductImageModel.getByProductId(p.id) }))
      );
      res.json(productsWithImages);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const product = await ProductModel.getById(req.params.id);
      if (!product) return res.status(404).json({ error: "Product not found" });
      product.images = await ProductImageModel.getByProductId(req.params.id);
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async addProduct(req, res) {
    try {
      const { name, description, category_id, status } = req.body;
      if (!name || !category_id) return res.status(400).json({ error: "Name and category required" });

      const slug = slugify(name, { lower: true, strict: true });
      const productId = await ProductModel.addProduct({ name, slug, description, category_id, status });

      req.files?.forEach(async (file) => {
        await ProductImageModel.addProductImage({ product_id: productId, image: `/uploads/products/${file.filename}` });
      });

      res.json({ success: true, message: "Product added successfully", productId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const product = await ProductModel.getById(req.params.id);
      if (!product) return res.status(404).json({ error: "Product not found" });

      const { category_id, name, description, status } = req.body;
      const slug = name ? slugify(name, { lower: true, strict: true }) : product.slug;
      
      // Update product details
      await ProductModel.update(req.params.id, { 
        category_id: category_id || product.category_id, 
        name: name || product.name, 
        slug, 
        description: description || product.description, 
        status: status || product.status 
      });

      // Handle image updates if new images are provided
      if (req.files && req.files.length > 0) {
        try {
          // Get existing images
          const existingImages = await ProductImageModel.getByProductId(req.params.id);
          
          // Delete old image files from disk
          existingImages.forEach((image) => {
            try {
              const imagePath = path.join(process.cwd(), 'uploads', 'products', path.basename(image.image));
              if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
              }
            } catch (fileErr) {
              console.error(`Error deleting file: ${image.image}`, fileErr);
            }
          });

          // Delete old image records from database
          await ProductImageModel.deleteByProductId(req.params.id);

          // Add new images
          for (const file of req.files) {
            await ProductImageModel.addProductImage({ 
              product_id: req.params.id, 
              image: `/uploads/products/${file.filename}` 
            });
          }
        } catch (imageErr) {
          // If image handling fails, still respond with success for product update
          console.error('Error handling images:', imageErr);
          return res.json({ 
            success: true, 
            message: "Product updated successfully, but there was an issue with image handling",
            warning: "Some images may not have been processed correctly"
          });
        }
      }

      res.json({ success: true, message: "Product updated successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const product = await ProductModel.getById(req.params.id);
      if (!product) return res.status(404).json({ error: "Product not found" });

      // Get existing images before deletion
      const existingImages = await ProductImageModel.getByProductId(req.params.id);
      
      // Delete image files from disk
      existingImages.forEach((image) => {
        try {
          const imagePath = path.join(process.cwd(), 'uploads', 'products', path.basename(image.image));
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        } catch (fileErr) {
          console.error(`Error deleting file: ${image.image}`, fileErr);
        }
      });

      await ProductImageModel.deleteByProductId(req.params.id);
      await ProductModel.delete(req.params.id);

      res.json({ success: true, message: "Product deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Set primary image for a product
  static async setPrimaryImage(req, res) {
    try {
      const { id, product_id } = req.params;
      const updated = await ProductImageModel.setPrimary(id, product_id);
      if (!updated) return res.status(404).json({ error: "Image or product not found" });
      res.json({ success: true, message: "Primary image set" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Delete an image
  static async deleteImage(req, res) {
    try {
      const { id } = req.params;
      
      // Get image details before deletion
      const image = await ProductImageModel.getById(id);
      if (!image) return res.status(404).json({ error: "Image not found" });

      // Delete image file from disk
      try {
        const imagePath = path.join(process.cwd(), 'uploads', 'products', path.basename(image.image));
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      } catch (fileErr) {
        console.error(`Error deleting file: ${image.image}`, fileErr);
      }

      const deleted = await ProductImageModel.deleteImage(id);
      if (!deleted) return res.status(404).json({ error: "Image not found" });
      
      res.json({ success: true, message: "Image deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default ProductController;