import AddressModel from "../../models/AddressModel.js";

class AddressController {
  // Get all addresses
  static async getAddresses(req, res) {
    try {
      const addresses = await AddressModel.getAddresses();
      res.json(addresses);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Add new address (all fields optional)
  static async addAddress(req, res) {
    const { address, city, state, pincode, map } = req.body;
    try {
      await AddressModel.addAddress({ address, city, state, pincode, map });
      res.json({ success: true, message: "Address added successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Update an address (only provided fields will be updated)
  static async updateAddress(req, res) {
    const { id } = req.params;
    const { address, city, state, pincode, map } = req.body;

    try {
      await AddressModel.updateAddress(id, { address, city, state, pincode, map });
      res.json({ success: true, message: "Address updated successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Soft delete an address
  static async deleteAddress(req, res) {
    const { id } = req.params;
    try {
      await AddressModel.deleteAddress(id);
      res.json({ success: true, message: "Address deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default AddressController;
