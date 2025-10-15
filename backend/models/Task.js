const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  dueDate: { type: Date },
  status: { type: String, enum: ['Pending','In Progress','Completed'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);