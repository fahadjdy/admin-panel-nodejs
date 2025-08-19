import ProfileModel from "../../models/ProfileModel.js";

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
      await ProfileModel.updateProfile({ name, email, company_name, about_us, slogan, logo, favicon });
      res.json({ success: true, message: "Profile updated successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default ProfileController;
