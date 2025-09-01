// services/AddressServices.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

class AddressServices {
  // Get all addresses
  static async getAll() {
    try {
      const response = await axios.get(`${API_URL}/addresses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Fetching addresses failed:", error);
      throw error;
    }
  }

  // Add a new address
  static async add(addressData) {
    try {
      const response = await axios.post(`${API_URL}/addresses`, addressData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Edit/update address
  static async edit(id, addressData) {
    try {
      const response = await axios.put(`${API_URL}/addresses/${id}`, addressData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Delete address
  static async delete(id) {
    try {
      const response = await axios.delete(`${API_URL}/addresses/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default AddressServices;
