// services/UserServices.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

class UserServices {
  // Get all users
  static async getAll() {
    try {
      const response = await axios.get(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Fetching users failed:", error);
      throw error;
    }
  }

  // Get single user by ID
  static async getUser(id) {
    try {
      const response = await axios.get(`${API_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Fetching user ${id} failed:`, error);
      throw error;
    }
  }

  // Add a new user
  static async addUser(userData) {
    try {
      const response = await axios.post(`${API_URL}/users/register`, userData, {
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

  // Edit/update user
  static async updateUser(id, userData) {
    try {
      const response = await axios.put(`${API_URL}/users/edit/${id}`, userData, {
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

  // Delete user
  static async deleteUser(id) {
    try {
      const response = await axios.delete(`${API_URL}/users/delete/${id}`, {
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

export default UserServices;
