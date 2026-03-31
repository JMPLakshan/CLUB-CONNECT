const Announcement = require("../models/Announcement");
const sendEmail = require("../utils/sendEmail");


exports.createAnnouncement = async (req, res) => {
  try {
   
    const announcement = await Announcement.create(req.body);

    
    if (req.body.sendEmail === true || req.body.sendEmail === "true") {
      
      
      const users = [
        "krathnayaka240@gmail.com", 
        "test1@gmail.com",
        "test2@gmail.com"
      ];

      console.log("Attempting to send emails...");

      
      for (let email of users) {
        try {
          await sendEmail(email, announcement.title, announcement.description);
          console.log(`✅ Email sent to: ${email}`);
        } catch (mailErr) {
          console.error(`❌ Failed to send email to ${email}:`, mailErr.message);
        }
      }
    }

    res.json(announcement);

  } catch (err) {
    console.error("Create Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};


exports.getAnnouncements = async (req, res) => {
  try {
    const data = await Announcement.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getSingle = async (req, res) => {
  try {
    const data = await Announcement.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "Not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateAnnouncement = async (req, res) => {
  try {
    const updated = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteAnnouncement = async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};