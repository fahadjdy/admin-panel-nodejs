import express from "express";
import AddressController from "../controllers/profile/AddressController.js";
import { authMiddleware } from  "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/", AddressController.getAddresses);
router.post("/", authMiddleware, AddressController.addAddress);
router.put("/:id", authMiddleware, AddressController.updateAddress);
router.delete("/:id", authMiddleware, AddressController.deleteAddress);

export default router;
