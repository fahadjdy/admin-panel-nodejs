import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

class ProductServices {
  // Get products with optional server-side params
  static async getAll(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params, // send query params (start, length, search, order)
      });
      return response.data;
    } catch (error) {
      console.error("Fetching products failed:", error);
      throw error;
    }
  }
}

export default ProductServices;