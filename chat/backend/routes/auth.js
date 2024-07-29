import express from "express";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from "../models/User.js";

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await new User({ username, password: hashedPassword }).save()
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' })
    res.status(201).json({ token, message: "User created successfully" })
  } catch (error) {
    res.status(500).json({ error: "Error creating user" })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" })
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' })
    res.json({ token })
  } catch (error) {
    res.status(500).json({ error: "Error logging in" })
  }
});

export default router;
