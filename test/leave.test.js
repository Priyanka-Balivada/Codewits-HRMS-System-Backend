const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const Employee = require('../models/employee');
const Leave = require('../models/leave');
require('dotenv').config({ path: '.env.test' });

const adminToken = jwt.sign({ id: 'admin_id', role: 'Admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
const employeeToken = jwt.sign({ id: 'employee_id', role: 'Employee' }, process.env.JWT_SECRET, { expiresIn: '1h' });

describe('Leave API', () => {
  beforeEach(async () => {
    await Employee.deleteMany({});
    await Leave.deleteMany({});
  });

  test('Employee should submit a leave request', async () => {
    const employee = await Employee.create({
      name: 'Alex Turner',
      email: `alex.turner${Date.now()}@example.com`, // Unique email
      position: 'Developer',
      salary: 70000,
      department: 'Engineering',
      password: 'password123'
    });

    const response = await request(app)
      .post('/leaves')
      .set('Authorization', `Bearer ${employeeToken}`)
      .send({
        leaveType: 'Sick Leave',
        startDate: '2024-10-01',
        endDate: '2024-10-05',
        employee: employee._id
      });

    expect(response.status).toBe(201);
    expect(response.body.leaveType).toBe('Sick Leave');
  });

  test('Admin should approve a leave request', async () => {
    const employee = await Employee.create({
      name: 'Olivia Brown',
      email: `olivia.brown${Date.now()}@example.com`, // Unique email
      position: 'Manager',
      salary: 80000,
      department: 'Marketing',
      password: 'password123'
    });

    const leave = await Leave.create({
      employee: employee._id,
      leaveType: 'Vacation',
      startDate: '2024-10-10',
      endDate: '2024-10-15',
      status: 'Pending'
    });

    const response = await request(app)
      .put(`/leaves/${leave._id}/approve`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'Approved' });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('Approved');
  });
});
