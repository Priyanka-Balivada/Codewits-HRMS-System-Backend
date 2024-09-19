const Leave = require('../models/leave');


// Employee submits leave
exports.submitLeave = async (req, res) => {
    // Ensure the user role is 'Employee'
    if (req.user.role !== 'Employee') {
        return res.status(403).json({ message: 'Access forbidden: Employees only' });
    }

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
    // Ensure the user role is 'Admin'
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access forbidden: Admins only' });
    }

    const { status } = req.body;
    try {
        const leave = await Leave.findById(req.params.id);
        if (!leave) return res.status(404).json({ message: 'Leave not found' });

        leave.status = status;
        await leave.save();
        res.status(200).json(leave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
