// services/ContactServices.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

class ContactServices {
  // Get all contacts
  static async getAll() {
    try {
      const response = await axios.get(`${API_URL}/contacts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Fetching contacts failed:", error);
      throw error;
    }
  }

  // Add a new contact
  static async add(mobile) {
    try {
      const response = await axios.post(
        `${API_URL}/contacts`,
        { mobile },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Adding contact failed:", error);
      throw error;
    }
  }

  // Delete a contact
  static async delete(id) {
    try {
      const response = await axios.delete(`${API_URL}/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Deleting contact failed:", error);
      throw error;
    }
  }
}

export default ContactServices;
