import express from 'express';
import {
  authenticateToken,
  register,
  login,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} from '../controllers/EmployeeController';
import * as validation from '../validation';

const router = express.Router();

router.post('/employees/register', validation.validateRequest(validation.registerEmployeeSchema), register);
router.post('/login', validation.validateRequest(validation.loginSchema), login);
router.get('/employees', authenticateToken, getAllEmployees);
router.get('/employees/:id', authenticateToken, getEmployeeById);
router.put('/employees/:id', authenticateToken, validation.validateRequest(validation.updateEmployeeSchema), updateEmployee);
router.delete('/employees/:id', authenticateToken, deleteEmployee);

export default router;