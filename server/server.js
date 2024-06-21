import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'

import { connect } from './src/db/connectDB.js'
import { userRouter } from './src/routes/user.routes.js'
import { taskRouter } from './src/routes/tasks.routes.js'

const app = express()
dotenv.config()

const PORT = process.env.PORT || 5000

const corsOptions = {
  origin: ['http://localhost:3000', 'http://192.168.1.5:3000', 'http://localhost:8080'],
  optionsSuccessStatus: 200,
  credentials: true
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', userRouter)
app.use('/api', taskRouter)

app.listen(PORT, () => {
  connect()
  console.log(`Server is listening on port ${PORT}`)
})
