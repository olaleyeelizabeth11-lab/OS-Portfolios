import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log("JWT Secret status:", process.env.JWT_SECRET ? "Loaded!" : "Missing!");

    // Use process.env.JWT_SECRET
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ error: 'JWT_SECRET is missing on the server' });
    }

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role },secret, {
      expiresIn: '7d',
    });

    res.json({ token });
  } catch (error) {
    next(error);
  }
});

export default router;
