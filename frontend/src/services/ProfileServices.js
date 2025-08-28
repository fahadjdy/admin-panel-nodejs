import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

class ProfileServices {
  static async updateProfile(data) {
    try {
      // If you’re passing plain object, convert it to FormData
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }

      const response = await axios.put(
        `${API_URL}/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Profile update failed:", error);
      throw error;
    }
  }

  static async getProfile() {
    try {
      const response = await axios.get(`${API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Profile fetch failed:", error);
      throw error;
    }
  }
}

export default ProfileServices;
