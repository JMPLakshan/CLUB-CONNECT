const express = require("express");
const router = express.Router();

const {
  createAnnouncement,
  getAnnouncements,
  getSingle,
  updateAnnouncement,
  deleteAnnouncement
} = require("../controllers/announcementController");

router.post("/", createAnnouncement);
router.get("/", getAnnouncements);
router.get("/:id", getSingle);
router.put("/:id", updateAnnouncement);
router.delete("/:id", deleteAnnouncement);

module.exports = router;