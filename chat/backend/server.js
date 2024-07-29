import express, { json } from 'express'
import mongoose  from 'mongoose'
import authRoutes from './routes/auth.js'
import messageRoutes from './routes/message.js'
import cors from 'cors'

mongoose.connect('mongodb://127.0.0.1:27017/chat-js')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('../frontend/dist'));
app.use(cors())
app.use(json())
app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
