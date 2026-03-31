const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/clubconnect')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// ✅ FIXED
app.use("/api/announcements", require("./routes/announcementRoutes"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});