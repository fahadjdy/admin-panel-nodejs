import ProfileModel from "../../models/ProfileModel.js";
import fs from 'fs/promises';
import path from 'path';

class ProfileController {
  static async getProfile(req, res) {
    try {
      const profile = await ProfileModel.getProfile();
      res.json(profile);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateProfile(req, res) {
    const { name, email, company_name, about_us, slogan } = req.body;
    const logo = req.files?.logo ? req.files.logo[0].filename : null;
    const favicon = req.files?.favicon ? req.files.favicon[0].filename : null;

    try {
      // Get current profile data to access existing file names
      const currentProfile = await ProfileModel.getProfile();
      
      // Remove existing files if new ones are uploaded
      if (logo && currentProfile.logo) {
        const existingLogoPath = path.join('uploads/profile/', currentProfile.logo); 
        await fs.unlink(existingLogoPath);         
      }
      
      if (favicon && currentProfile.favicon) {
        const existingFaviconPath = path.join('uploads/profile/', currentProfile.favicon);
        await fs.unlink(existingFaviconPath);        
      }

      // Update profile with new data
      await ProfileModel.updateProfile({ 
        name, 
        email, 
        company_name, 
        about_us, 
        slogan, 
        logo: logo || currentProfile.logo, // Keep existing if no new file uploaded
        favicon: favicon || currentProfile.favicon // Keep existing if no new file uploaded
      });
      
      res.json({ success: true, message: "Profile updated successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default ProfileController;