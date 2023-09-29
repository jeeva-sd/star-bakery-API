import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../database/models/user.js';
import { validateRegister } from '../middleware/user.js';

const router = express.Router();

router.post('/register', validateRegister, async (req, res) => {
  try {
    const { name, age, gender, dob, password } = req.body;
    const existingUser = await User.findOne({ name });

    if (existingUser && existingUser.name === name) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, age, gender, dob, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ name: username });
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const token = jwt.sign({ username: user.name, userId: user._id, }, 'QWERTY');

    const userInfo = {
      token,
      isDev: false,
      userId: user._id,
      isAuthenticated: true
    };

    res.status(200).json({ message: 'Login successful', ...userInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;
