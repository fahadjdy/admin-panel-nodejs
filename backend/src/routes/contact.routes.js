import express from "express";
import ContactController from "../controllers/profile/ContactController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", ContactController.getContacts);
router.post("/", authMiddleware, ContactController.addContact);
router.delete("/:id", authMiddleware, ContactController.deleteContact);

export default router;
