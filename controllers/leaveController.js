const Leave = require('../models/leave');

// Employee submits leave
exports.submitLeave = async (req, res) => {
    const { leaveType, startDate, endDate } = req.body;
    try {
        const leave = new Leave({
          employee: req.user.id,
          leaveType,
          startDate,
          endDate
        });
        await leave.save();
        res.status(201).json(leave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Admin approves/rejects leave
exports.updateLeaveStatus = async (req, res) => {
    const { status } = req.body;
    try {
        const leave = await Leave.findById(req.params.id);
        if (!leave) return res.status(404).json({
          message: 'Leave not found'
        });

        leave.status = status;
        await leave.save();
        res.status(200).json(leave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
