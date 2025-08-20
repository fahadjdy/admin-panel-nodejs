import ContactModel from "../../models/ContactModel.js";

class ContactController {
  static async getContacts(req, res) {
    try {
      const contacts = await ContactModel.getContacts();
      res.status(200).json( contacts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async addContact(req, res) {
    const { mobile } = req.body;
    try {
      const contact = await ContactModel.getContactByContact(mobile);
      if (contact && contact.length > 0) {
        return res.status(400).json({ error: "Contact already exists" });
      }
      await ContactModel.addContact(mobile);
      res.json({ success: true, message: "Contact added successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteContact(req, res) {
    const { id } = req.params;
    try {
      const contact = await ContactModel.getContactById(id);
      if (!contact || contact.length === 0) {
        return res.status(404).json({ error: "Contact not found" });
      }

      await ContactModel.deleteContact(id);
      res.json({ success: true, message: "Contact deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default ContactController;
