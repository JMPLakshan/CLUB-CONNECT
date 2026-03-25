import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import User from './models/User.js';
import path from 'path';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.resolve('uploads')));

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('CLUB CONNECT API is running');
});

const DEFAULT_PORT = Number(process.env.PORT) || 5000;
const DEFAULT_ADMIN_EMAIL = process.env.DEFAULT_ADMIN_EMAIL || 'admin@clubconnect.com';
const DEFAULT_ADMIN_PASSWORD = process.env.DEFAULT_ADMIN_PASSWORD || 'password123';
const DEFAULT_ADMIN_NAME = process.env.DEFAULT_ADMIN_NAME || 'System Admin';

const ensureDefaultAdmin = async () => {
  const existingAdmin = await User.findOne({ email: DEFAULT_ADMIN_EMAIL });

  if (existingAdmin) {
    if (existingAdmin.role !== 'admin') {
      existingAdmin.role = 'admin';
      await existingAdmin.save();
      console.log(`Updated role to admin for: ${DEFAULT_ADMIN_EMAIL}`);
    }
    return;
  }

  await User.create({
    name: DEFAULT_ADMIN_NAME,
    email: DEFAULT_ADMIN_EMAIL,
    password: DEFAULT_ADMIN_PASSWORD,
    role: 'admin',
  });
  console.log(`Default admin created: ${DEFAULT_ADMIN_EMAIL}`);
};

const startListening = (portToTry = DEFAULT_PORT) => {
  const server = app.listen(portToTry, () => {
    console.log(`Server running on port ${portToTry}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      const nextPort = portToTry + 1;
      console.log(`Port ${portToTry} is in use. Trying port ${nextPort}...`);
      startListening(nextPort);
      return;
    }

    console.log('Server failed to start:', err.message);
    process.exit(1);
  });
};

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected Successfully');
    console.log(`Database: ${mongoose.connection.name}`);
    await ensureDefaultAdmin();
    startListening(DEFAULT_PORT);
  } catch (err) {
    console.log('MongoDB Connection Failed:', err.message);
    process.exit(1);
  }
};

startServer();
