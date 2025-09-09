import bcrypt from 'bcryptjs';
import { type EmployeeRepository } from '../domain/interfaces/EmployeeRepository';

export async function loginEmployee(repo: EmployeeRepository, email: string, password: string) {
  const employee = await repo.findByEmail(email);
  if (!employee) return null;
  const isValid = await bcrypt.compare(password, employee.password);
  return isValid ? employee : null;
}