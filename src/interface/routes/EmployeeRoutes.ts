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

const router = express.Router();

router.post('/employees/register', register);
router.post('/login', login);
router.get('/employees', authenticateToken, getAllEmployees);
router.get('/employees/:id', authenticateToken, getEmployeeById);
router.put('/employees/:id', authenticateToken, updateEmployee);
router.delete('/employees/:id', authenticateToken, deleteEmployee);

export default router;