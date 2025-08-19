import ContactModel from "../../models/ContactModel.js";

class ContactController {
  static async getContacts(req, res) {
    try {
      const contacts = await ContactModel.getContacts();
      res.json(contacts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async addContact(req, res) {
    const { mobile } = req.body;
    try {
      await ContactModel.addContact(mobile);
      res.json({ success: true, message: "Contact added successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteContact(req, res) {
    const { id } = req.params;
    try {
      await ContactModel.deleteContact(id);
      res.json({ success: true, message: "Contact deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default ContactController;
