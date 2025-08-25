// src/controllers/clients/ClientsController.js
import ClientsModel from "../../models/ClientsModel.js";
import fs from "fs";
import path from "path";

class ClientsController {
  // Get all clients
  static async getAll(req, res) {
    try {
      const clients = await ClientsModel.getAll();
      res.json({ success: true, data: clients });
    } catch (error) {
      console.error("Error fetching clients:", error);
      res.status(500).json({ success: false, message: "Failed to fetch clients" });
    }
  }

  // Get client by ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const client = await ClientsModel.getById(id);
      if (!client) {
        return res.status(404).json({ success: false, message: "Client not found" });
      }
      res.json({ success: true, data: client });
    } catch (error) {
      console.error("Error fetching client:", error);
      res.status(500).json({ success: false, message: "Failed to fetch client" });
    }
  }

  // Create new client
  static async create(req, res) {
    try {
      const { name, website, status = "Draft", display_order = 0 } = req.body;
      const logo = req.file ? req.file.path : null;

      if (!logo) {
        return res.status(400).json({ success: false, message: "Logo image is required" });
      }

      const id = await ClientsModel.create({ name, logo, website, status, display_order });

      res.status(201).json({ success: true, message: "Client created", id });
    } catch (error) {
      console.error("Error creating client:", error);
      res.status(500).json({ success: false, message: "Failed to create client" });
    }
  }

  // Update client
   static async update(req, res) {
      try {
        const { id } = req.params;
        const { name, website, status, display_order } = req.body;

        // Get existing client to check old logo
        const existingClient = await ClientsModel.getById(id);
        if (!existingClient) {
          return res.status(404).json({ success: false, message: "Client not found" });
        }

        let logo = existingClient.logo; // default to old logo

        // If new file uploaded
        if (req.file) {
          logo = req.file.path;

          // Delete old logo file if exists
          if (existingClient.logo && fs.existsSync(path.join(process.cwd(), existingClient.logo))) {
            fs.unlinkSync(path.join(process.cwd(), existingClient.logo));
          }
        }

        const success = await ClientsModel.update(id, { name, logo, website, status, display_order });
        if (!success) {
          return res.status(400).json({ success: false, message: "No fields to update" });
        }

        res.json({ success: true, message: "Client updated" });
      } catch (error) {
        console.error("Error updating client:", error);
        res.status(500).json({ success: false, message: "Failed to update client" });
      }
    }

  // Soft delete client
  static async delete(req, res) {
    try {
      const { id } = req.params;
      await ClientsModel.delete(id);
      res.json({ success: true, message: "Client deleted" });
    } catch (error) {
      console.error("Error deleting client:", error);
      res.status(500).json({ success: false, message: "Failed to delete client" });
    }
  }
}

export default ClientsController;
