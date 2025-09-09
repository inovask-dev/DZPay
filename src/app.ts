import express from 'express';
import swaggerUi from 'swagger-ui-express';
import employeeRoutes from './interface/routes/EmployeeRoutes';

const app = express();
app.use(express.json());

// Manual Swagger spec (instead of using swagger-jsdoc)
const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'DZPay API',
    version: '1.0.0',
    description: 'Employee management API with JWT authentication',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ bearerAuth: [] }],
  paths: {
    '/api/employees/register': {
      post: {
        summary: 'Register a new employee',
        tags: ['Employees'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['first_name', 'last_name', 'email', 'username', 'password'],
                properties: {
                  first_name: { type: 'string' },
                  last_name: { type: 'string' },
                  national_id: { type: 'integer' },
                  cnas_number: { type: 'integer' },
                  birth_date: { type: 'string', format: 'date-time' },
                  hire_date: { type: 'string', format: 'date-time' },
                  contract_Type: { type: 'string', enum: ['FULL_TIME', 'PART_TIME', 'INTERN', 'TEMPORARY'] },
                  position: { type: 'string' },
                  department: { type: 'string' },
                  work_location: { type: 'string' },
                  bank_account: { type: 'integer' },
                  email: { type: 'string', format: 'email' },
                  phone: { type: 'integer' },
                  username: { type: 'string' },
                  password: { type: 'string', minLength: 6 }
                }
              }
            }
          }
        },
        responses: {
          '200': { description: 'Employee registered successfully' },
          '400': { description: 'Registration failed' }
        }
      }
    },
    '/api/login': {
      post: {
        summary: 'Login with email and password',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          '200': { description: 'Login successful' },
          '401': { description: 'Invalid credentials' }
        }
      }
    },
    '/api/employees': {
      get: {
        summary: 'Get all employees',
        tags: ['Employees'],
        security: [{ bearerAuth: [] }],
        responses: {
          '200': { description: 'List of employees' },
          '500': { description: 'Failed to fetch employees' }
        }
      }
    },
    '/api/employees/{id}': {
      get: {
        summary: 'Get employee by ID',
        tags: ['Employees'],
        security: [{ bearerAuth: [] }],
        parameters: [{
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer' }
        }],
        responses: {
          '200': { description: 'Employee data' },
          '404': { description: 'Employee not found' }
        }
      },
      put: {
        summary: 'Update employee by ID',
        tags: ['Employees'],
        security: [{ bearerAuth: [] }],
        parameters: [{
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer' }
        }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  first_name: { type: 'string' },
                  last_name: { type: 'string' },
                  email: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          '200': { description: 'Employee updated successfully' },
          '404': { description: 'Employee not found' }
        }
      },
      delete: {
        summary: 'Delete employee by ID',
        tags: ['Employees'],
        security: [{ bearerAuth: [] }],
        parameters: [{
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer' }
        }],
        responses: {
          '200': { description: 'Employee deleted successfully' },
          '404': { description: 'Employee not found' }
        }
      }
    }
  }
};

// Swagger UI endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api', employeeRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
  console.log('Swagger docs available at http://localhost:3000/api-docs');
});