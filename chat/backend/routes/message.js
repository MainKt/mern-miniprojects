import express from "express";
import Message from "../models/Message.js";
import jwt from 'jsonwebtoken'

const router = express.Router()

const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization')
  if (!authHeader) return res.status(401).json({ error: 'Access denied' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' })

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' })
    req.user = user
    next()
  })
}

router.get('/', async (_req, res) => {
  try {
    const messages = await Message.find().populate('author', 'username')
    res.json(messages)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching messages' })
  }
})

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { content } = req.body;
    const message = new Message({ content, author: req.user.userId })
    await message.save()
    res.status(201).json(message)
  } catch (error) {
    res.status(500).json({ error: 'Error creating message' })
  }
})
export default router
