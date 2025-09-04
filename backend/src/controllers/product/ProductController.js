import ProductModel from "../../models/ProductModel.js";
import ProductImageModel from "../../models/ProductImageModel.js";
import CategoryModel from "../../models/CategoryModel.js";
import { slugify } from "../../utils/helper.function.js";
import fs from "fs";
import path from "path";

function deleteFiles(paths = []) {
  paths.forEach(filePath => {
    try {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    } catch (err) {
      console.error("File delete error:", filePath, err);
    }
  });
}

class ProductController {
  static async getAll(req, res) {
    try {
      // Pagination
      const limit = parseInt(req.query.limit) || 10;
      const offset = parseInt(req.query.offset) || 0;

      // Search and filters from query params
      const searchQuery = req.query.search || '';
      const filters = {
        category: req.query.category || null,
        status: req.query.status || null,
        slug: req.query.slug || null,
        name: req.query.name || null
      };

      // Prepare search object
      const search = { search: searchQuery, filter: filters };

      // Fetch products from model
      const products = await ProductModel.getAll(search, limit, offset);

      // Add images to each product
      const productsWithImages = await Promise.all(
        products.map(async (p) => ({
          ...p,
          images: await ProductImageModel.getByProductId(p.id),
        }))
      );

      // Get total count for pagination
      const total = await ProductModel.getTotalCount(search);

      res.json({ success: true, data: productsWithImages, total });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }


  static async findById(id) {
    const product = await ProductModel.getById(id);
    if (!product) return null;
    product.images = await ProductImageModel.getByProductId(id);
    return product;
  }


  static async getById(req, res) {
    try {
      const product = await ProductModel.getById(req.params.id);
      if (!product) return res.status(404).json({ success: false, message: "Product not found" });

      product.images = await ProductImageModel.getByProductId(req.params.id);
      res.json({ success: true, data: product });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async addProduct(req, res) {
    try {
      const { name, description, category_id, status } = req.body;
      if (!name || !category_id) return res.status(400).json({ success: false, message: "Name and category required" });

      const slug = slugify(name);

      // Check if category exists
      const is_exist = await ProductModel.getBySlug(slug);
      if (is_exist) return res.status(400).json({ success: false, message: "Product already exists" });

      const productId = await ProductModel.addProduct({ name, slug, description, category_id, status });

      // Save product images
      await Promise.all(
        req.files.map(file =>
          ProductImageModel.addProductImage({
            product_id: productId,
            image: `/uploads/products/${category_id}/${file.filename}`
          })
        )
      );

      const product = await ProductController.findById(productId);

      res.json({ success: true, message: "Product added successfully", product });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async addProductImage(req, res) {
    try {
      const product_id  = req.params.id;
      if (!product_id) return res.status(400).json({ success: false, message: "Product ID is required" });
      if (!req.files || req.files.length === 0) return res.status(400).json({ success: false, message: "No images uploaded" });

      // Check if product exists
      const product = await ProductModel.getById(product_id);
      if (!product) return res.status(404).json({ success: false, message: "Product not found" });

      const addedImages = [];
      for (const file of req.files) {
        const imagePath = `/uploads/products/${category_id}/${file.filename}`;
        const imageId = await ProductImageModel.addProductImage({ product_id, image: imagePath });
        addedImages.push({ id: imageId, image: imagePath });
      }

      res.json({ success: true, message: "Images added successfully", images: addedImages });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }


  static async update(req, res) {
    try {
      const product = await ProductModel.getById(req.params.id);
      if (!product) return res.status(404).json({ success: false, message: "Product not found" });

      const { category_id, name, description, status } = req.body;
      const slug = name ? slugify(name) : product.slug;

      if(category_id){
        const is_category_exist = await CategoryModel.getById(category_id);
        if (!is_category_exist) return res.status(404).json({ success: false, message: "Category not found" });
      }

      await ProductModel.update(req.params.id, {
        category_id: category_id || product.category_id,
        name: name || product.name,
        slug,
        description: description || product.description,
        status: status || product.status
      });

      res.json({ success: true, message: "Product updated successfully" });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const product = await ProductModel.getById(req.params.id);
      if (!product) return res.status(404).json({ success: false, message: "Product not found" });

      // Soft delete product and delete image records
      await ProductImageModel.deleteByProductId(req.params.id);
      await ProductModel.delete(req.params.id);

      res.json({ success: true, message: "Product deleted!" });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async setPrimaryImage(req, res) {
    try {
      const { product_id, product_image_id } = req.params;
      const updated = await ProductImageModel.setPrimary(product_image_id, product_id);
      if (!updated) return res.status(404).json({ success: false, message: "Image or product not found" });
      res.json({ success: true, message: "Primary image set" });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async deleteImage(req, res) {
    try {
      const  id = req.params.id;
      const image = await ProductImageModel.getById(id);
      if (!image) return res.status(404).json({ success: false, message: "Image not found" });

      deleteFiles([path.join(process.cwd(), 'uploads', 'products', path.basename(image.image))]);
      await ProductImageModel.delete(id);

      res.json({ success: true, message: "Image deleted" });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

export default ProductController;
