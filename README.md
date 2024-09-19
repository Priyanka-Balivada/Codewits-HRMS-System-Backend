# HRMS Backend

## Setup

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Set up your `.env` file:
    - `MONGO_URI`: MongoDB connection string
    - `JWT_SECRET`: Secret key for JWT authentication
4. Run the app using `npm start`.

## API Endpoints

### Authentication
- POST /api/auth/login - Login user

### Employees
- GET /api/employees - Get all employees (Admin only)
- POST /api/employees - Create a new employee (Admin only)
- GET /api/employees/:id - Get employee by ID
- PUT /api/employees/:id - Update employee (Admin only)
- DELETE /api/employees/:id - Delete employee (Admin only)

### Leaves
- POST /api/leaves/submit - Submit a leave request
- PATCH /api/leaves/status/:id - Approve or reject leave request (Admin only)

## Testing

To run unit tests:
```bash
npm test
```
## Postman Collections

In addition to the unit tests, a Postman collection file has been provided for manual testing and exploration of the API endpoints. This collection includes predefined requests for all the major routes of the Employee and Leave APIs.

### How to Import the Postman Collection

1. **Download the Postman Collection File:**
   - The Postman collection file is included in the `postman` directory of this repository. The file is named `HRMS_API.postman_collection.json`.

2. **Open Postman:**
   - Launch the Postman application on your computer.

3. **Import the Collection:**
   - Click on the "Import" button located at the top left of the Postman interface.
   - Choose the "Upload Files" option.
   - Select the `HRMS_API.postman_collection.json` file from the `postman` directory and click "Open" to import it.

4. **Explore the Collection:**
   - Once imported, you will see the collection listed in the "Collections" tab on the left side of the Postman interface.
   - You can now expand the collection to view the available requests and execute them to interact with the API.

### Collection Contents

The Postman collection includes:

- **Employee API Requests:**
  - Create an employee
  - Get all employees
  - Get a single employee by ID
  - Update an employee
  - Delete an employee

- **Leave API Requests:**
  - Submit a leave request
  - Approve a leave request

This collection will help you manually test the API endpoints and understand their behavior. It also provides examples of request payloads and expected responses.
