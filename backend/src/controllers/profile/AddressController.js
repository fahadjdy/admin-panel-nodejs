import AddressModel from "../../models/AddressModel.js";

class AddressController {
  static async getAddresses(req, res) {
    try {
      const addresses = await AddressModel.getAddresses();
      res.json(addresses);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async addAddress(req, res) {
    const { address, map_link } = req.body;
    try {
      await AddressModel.addAddress({ address, map_link });
      res.json({ success: true, message: "Address added successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateAddress(req, res) {
    const { id } = req.params;
    const { address, map_link } = req.body;
    try {
      await AddressModel.updateAddress(id, { address, map_link });
      res.json({ success: true, message: "Address updated successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

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
