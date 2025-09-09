import bcrypt from 'bcryptjs';
import { type Employee } from '../domain/entities/Employee';
import { type EmployeeRepository } from '../domain/interfaces/EmployeeRepository';
import type { Prisma } from '../generated/prisma';

export async function registerEmployee(repo: EmployeeRepository, data: Employee): Promise<Employee> {
  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(data.password, 10);
  
  // Remove Employee_id and create employee data with hashed password
  const { Employee_id, ...employeeData } = {
    ...data,
    password: hashedPassword
  };
  
  return repo.create(employeeData as Prisma.EmployeeCreateInput);
}