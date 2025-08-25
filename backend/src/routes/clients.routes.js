// src/routes/clients.routes.js
import { Router } from "express";
import ClientsController from "../controllers/clients/ClientsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { clientsUpload } from "../multer/clientsUpload.js";

const router = Router();

// Get all clients
router.get("/", authMiddleware, ClientsController.getAll);

// Get single client
router.get("/:id", authMiddleware, ClientsController.getById);

// Create new client
router.post(
  "/",
  authMiddleware,
  clientsUpload.single("logo"),
  ClientsController.create
);

// Update client
router.put(
  "/:id",
  authMiddleware,
  clientsUpload.single("logo"),
  ClientsController.update
);

// Soft delete client
router.delete("/:id", authMiddleware, ClientsController.delete);

export default router;
