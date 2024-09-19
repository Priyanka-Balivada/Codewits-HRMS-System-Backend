const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    },
    leaveType: {
      type: String,
      enum: ['Sick', 'Vacation', 'Casual'],
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: { 
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending'
    }
});

module.exports = mongoose.model('Leave', leaveSchema);
