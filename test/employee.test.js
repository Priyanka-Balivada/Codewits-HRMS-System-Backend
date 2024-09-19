const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const Employee = require('../models/employee');
require('dotenv').config({ path: '.env.test' });

const adminToken = jwt.sign({ id: 'admin_id', role: 'Admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
const employeeToken = jwt.sign({ id: 'employee_id', role: 'Employee' }, process.env.JWT_SECRET, { expiresIn: '1h' });

describe('Employee API', () => {
  // Clear the Employee collection before each test
  beforeEach(async () => {
    await Employee.deleteMany({});
  });

  test('Admin should create an employee', async () => {
    const response = await request(app)
      .post('/employees')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'John Doe',
        email: `john.doe${Date.now()}@example.com`, // Unique email
        position: 'Developer',
        salary: 70000,
        department: 'Engineering',
        password: 'password123'
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('John Doe');
  });

  test('Admin should get all employees', async () => {
    await Employee.create({
      name: 'Jane Smith',
      email: `jane.smith${Date.now()}@example.com`, // Unique email
      position: 'Manager',
      salary: 80000,
      department: 'Marketing',
      password: 'password123'
    });

    const response = await request(app)
      .get('/employees')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('Admin should get a single employee by ID', async () => {
    const employee = await Employee.create({
      name: 'Mike Johnson',
      email: `mike.johnson${Date.now()}@example.com`, // Unique email
      position: 'Analyst',
      salary: 65000,
      department: 'Finance',
      password: 'password123'
    });

    const response = await request(app)
      .get(`/employees/${employee._id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Mike Johnson');
  });

  test('Admin should update an employee', async () => {
    const employee = await Employee.create({
      name: 'Emily Davis',
      email: `emily.davis${Date.now()}@example.com`, // Unique email
      position: 'Consultant',
      salary: 75000,
      department: 'Consulting',
      password: 'password123'
    });

    const response = await request(app)
      .put(`/employees/${employee._id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ salary: 80000 });

    expect(response.status).toBe(200);
    expect(response.body.salary).toBe(80000);
  });

  test('Admin should delete an employee', async () => {
    const employee = await Employee.create({
      name: 'Sara Lee',
      email: `sara.lee${Date.now()}@example.com`, // Unique email
      position: 'Coordinator',
      salary: 60000,
      department: 'Operations',
      password: 'password123'
    });

    const response = await request(app)
      .delete(`/employees/${employee._id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Employee removed successfully');
  });

  test('Employee should not access employee management routes', async () => {
    const response = await request(app)
      .get('/employees')
      .set('Authorization', `Bearer ${employeeToken}`);

    expect(response.status).toBe(403); // Forbidden
  });
});
