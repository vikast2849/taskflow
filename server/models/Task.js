/**
 * Task Mongoose Model
 * Cognifyz Technologies Full Stack Development Internship - Level 3 Task 6
 */

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters long'],
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
      type: String,
      trim: true,
      default: '',
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium'
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending'
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required']
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Task must belong to an authenticated user'],
      index: true
    }
  },
  {
    timestamps: true
  }
);

// Compound index for high performance user task filtering
taskSchema.index({ user: 1, status: 1 });
taskSchema.index({ user: 1, priority: 1 });

taskSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Task', taskSchema);
