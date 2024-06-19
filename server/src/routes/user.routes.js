import express from 'express'
import { register, login, logout } from '../controllers/user.controller.js'

export const userRouter = express.Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.post('/logout', logout)