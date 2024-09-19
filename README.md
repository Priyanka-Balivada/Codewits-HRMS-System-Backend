# HRMS Backend

## Setup

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Set up your `.env` file:
    - `MONGO_URI`: MongoDB connection string
    - `JWT_SECRET`: Secret key for JWT authentication
4. Run the app using `npm start`.

## Available Routes

- `POST /api/employees/create`: Create an employee (Admin only).
- `POST /api/leaves/submit`: Submit a leave request (Employee).
- `PATCH /api/leaves/status/:id`: Update leave status (Admin).

## Testing

To run unit tests:
```bash
npm test
