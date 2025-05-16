import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const createToken = (user) => jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });
    const user = await User.create({ name, email, password });
    res.json({ token: createToken(user) });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ token: createToken(user) });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    res.json({
      name: req.user.name,
      email: req.user.email,
      id: req.user._id,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user' });
  }
};