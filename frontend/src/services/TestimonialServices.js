// services/TestimonialServices.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

class TestimonialServices {
  // Get all testimonials
  static async getAll() {
    try {
      const response = await axios.get(`${API_URL}/testimonial`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Fetching testimonials failed:", error);
      throw error;
    }
  }

  // Get testimonial by ID
  static async getById(id) {
    try {
      const response = await axios.get(`${API_URL}/testimonial/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Add new testimonial
  static async add(testimonialData) {
    try {
      const response = await axios.post(`${API_URL}/testimonial`, testimonialData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data", // because image upload
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Update testimonial
  static async update(id, testimonialData) {
    try {
      const response = await axios.put(`${API_URL}/testimonial/${id}`, testimonialData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Delete testimonial
  static async delete(id) {
    try {
      const response = await axios.delete(`${API_URL}/testimonial/${id}`, {
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

export default TestimonialServices;
