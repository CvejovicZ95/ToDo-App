import { User } from '../models/usersSchema.js'
import { logger } from '../../logger.js'

export const getAllUsers = async () => {
  try {
    const users = await User.find()
    return users
  } catch (error) {
    logger.error('Error fetching all products:', error.message)
    throw new Error('Error fetching all products')
  }
}
