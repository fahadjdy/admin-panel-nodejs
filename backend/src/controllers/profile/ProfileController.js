import ProfileModel from "../../models/ProfileModel.js";
import fs from "fs/promises";
import path from "path";

class ProfileController {
  // Get profile by user_id (assuming req.user.id from auth middleware)
  static async getProfile(req, res) {
    try {
      const userId = req.user.id; 
      const profile = await ProfileModel.findByUserId(userId);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }

      res.json(profile);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Update profile
  static async update(req, res) {
    
    const {
      owner_name,
      email,
      company_name,
      about_company,
      slogan,
      is_maintainance
    } = req.body;

   

    const logo = req.files?.logo ? req.files.logo[0].filename : null;
    const favicon = req.files?.favicon ? req.files.favicon[0].filename : null;

    try {
      
      const user_id =  req.user.id; 
      const currentProfile = await ProfileModel.findByUserId(user_id);

      if (!currentProfile) {
        return res.status(404).json({ error: "Profile not found" });
      }

      // Remove old files if new ones are uploaded
      if (logo && currentProfile.logo) {
        const existingLogoPath = path.join("uploads/profile/", currentProfile.logo);
        try {
          await fs.unlink(existingLogoPath);
        } catch (_) {
          /* ignore missing file */
        }
      }

      if (favicon && currentProfile.favicon) {
        const existingFaviconPath = path.join("uploads/profile/", currentProfile.favicon);
        try {
          await fs.unlink(existingFaviconPath);
        } catch (_) {
          /* ignore missing file */
        }
      }
      
      // Update profile
       await ProfileModel.update(currentProfile.id, {
        owner_name,
        email,
        company_name,
        about_company,
        slogan,
        is_maintainance: is_maintainance == "true" ? 1 : 0,
        logo: logo || currentProfile.logo,
        favicon: favicon || currentProfile.favicon
      });

      res.json({ success: true, message: "Profile updated successfully" , result: await ProfileModel.findByUserId(1)});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default ProfileController;
