import express from 'express'
import { register, login, logout, getAllUsersController } from '../controllers/user.controller.js'

export const userRouter = express.Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.post('/logout', logout)
userRouter.get('/users', getAllUsersController)