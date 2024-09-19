const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    position: {
      type: String,
      required: true
    },
    salary: {
      type: Number,
      required: true
    },
    department: {
      type: String, 
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['Admin', 'Employee'],
      default: 'Employee' }
});

module.exports = mongoose.model('Employee', employeeSchema);
