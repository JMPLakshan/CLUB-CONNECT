const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  title: String,
  description: String,
  expiryDate: Date,
  targetAudience: String,
  sendEmail: Boolean,
  isPinned: Boolean,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Announcement", announcementSchema);