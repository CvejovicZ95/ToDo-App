import mongoose from 'mongoose'

export const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  deleted: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    currentTime: () => new Date().toLocaleString()
  }
})

const Task = mongoose.model('Task', taskSchema)

export { Task }
