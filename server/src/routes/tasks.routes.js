import express from 'express'
import { getTasksByUserController, uploadTask, updateTaskController, markTaskAsDeletedController } from '../controllers/task.controller.js'


export const taskRouter = express.Router()


taskRouter.get('/tasks/user/:userId', getTasksByUserController)

taskRouter.post('/tasks', uploadTask)
taskRouter.put('/tasks/update/:id', updateTaskController)
taskRouter.put('/tasks/delete/:id', markTaskAsDeletedController)