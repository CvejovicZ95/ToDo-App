import { Task } from '../models/tasksSchema.js'
import { logger } from '../../logger.js'

export const getTasksByUser = async (userId) => {
    try {
        const tasks = await Task.find({user: userId }).populate('user')
        return tasks;
    } catch (error) {
        logger.error('Error fetching tasks by user', error.mesage)
        throw new Error('Error fetching task by user')
    }
}

export const updateTaskById = async (taskId, newData) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(taskId, newData, { new: true });
        logger.info('Task updated successfully:', updatedTask._id);
        return updatedTask;
    } catch (error) {
        logger.error('Error updating task:', error.message);
        throw new Error('Error updating task');
    }
};

export const markTaskAsDeleted = async (taskId) => {
    try {
        const task = await Task.findById(taskId)
        if (!task) {
            logger.error('Task not found')
            throw new Error('Task not found')
        }
        task.deleted = true
        await task.save()
        logger.info('Task marked as deleted successfully', taskId)
        await task.save()
    } catch (error) {
        logger.error('Error marking task as deleted:', error.message)
        throw new Error('Error marking task as deleted')
    }
}
