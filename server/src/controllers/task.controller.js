import { Task } from '../models/tasksSchema.js'
import { User } from '../models/usersSchema.js'
import { logger } from '../../logger.js'

import { getAllUsers, getTasksByUser, updateTaskById, markTaskAsDeleted } from '../service/taskService.js'

export const getAllUsersController = async (req, res) => {
    try {
        const allUsers = await getAllUsers()
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(500).json({ error: 'Server error'})
    }
}

export const getTasksByUserController = async (req, res) => {
    try {
        const userId = req.params.userId
        const tasks = await getTasksByUser(userId)
        if (!tasks || tasks.length === 0) {
            return res.status(404).json([])
        }
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ error: 'Server error'})
    }
}

export const uploadTask = async (req, res) => {
    try {
        const { name, userId } = req.body

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        const newTask = new Task({
            name,
            user: userId
        })

        await newTask.save()
        logger.info('Task created successfully')
        res.status(201).json(newTask)
    } catch (error) {
        logger.error('Error uploading task:', error)
        res.status(500).json({ error: 'Server error' })
    }
}

export const updateTaskController = async (req, res) => {
    try {
        const taskId = req.params.taskId
        const newData = req.body
        const updatedTask = await updateTaskById(taskId, newData)
        res.status(200).json(updatedTask)
    } catch (error) {
        res.status(500).json('Server error')
    }
}

export const markTaskAsDeletedController = async (req, res) => {
    try {
        const taskId = req.params.id
        await markTaskAsDeleted(taskId)
        res.status(200).json({ message: 'Task is successfully marked as deleted'})
    } catch (error) {
        res.status(500).json('Server error')
    }
}