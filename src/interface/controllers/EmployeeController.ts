import { PrismaEmployeeRepository } from '../../infrastructure/repositories/PrismaEmployeeRepository';
import { registerEmployee } from '../../use-cases/RegisterEmployee';
import { loginEmployee } from '../../use-cases/LoginEmployee';
import { type Employee } from '../../domain/entities/Employee';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import type { NextFunction, Request, Response } from 'express';

const repo = new PrismaEmployeeRepository();


export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) => {
    if (err) return res.sendStatus(403);
    (req as any).user = user as JwtPayload;
    next();
  });
}

export async function register(req: Request, res: Response) {
  try {
    const employee = await registerEmployee(repo, req.body);
    res.json({ message: 'Employee registered successfully', employee });
  } catch (error) {
    res.status(400).json({ error: 'Employee registration failed', details: error });
  }
}


export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const employee = await loginEmployee(repo, email, password);
    if (!employee) return res.status(401).json({ error: 'Invalid credentials' });
    const accessToken = jwt.sign(
      { username: employee.username, employee_id: employee.Employee_id },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: '1h' }
    );
    res.json({ ACCESS_TOKEN: accessToken });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error });
  }
}


export async function getAllEmployees(req: Request, res: Response) {
  try {
    const employees = await repo.findAll();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employees', details: error });
  }
}


export async function getEmployeeById(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const employee = await repo.findById(id);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employee', details: error });
  }
}


export async function updateEmployee(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const employee = await repo.update(id, req.body);
    res.json({ message: 'Employee updated successfully', employee });
  } catch (error) {
    res.status(404).json({ error: 'Employee not found', details: error });
  }
}


export async function deleteEmployee(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    await repo.delete(id);
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(404).json({ error: 'Employee not found', details: error });
  }
}