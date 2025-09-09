import { Prisma } from '../../generated/prisma';
import { type Employee } from '../entities/Employee.ts';

export interface EmployeeRepository {
  create(data: Prisma.EmployeeCreateInput): Promise<Employee>;
  findByEmail(email: string): Promise<Employee | null>;
  findById(id: number): Promise<Employee | null>;
  findAll(): Promise<Employee[]>;
  update(id: number, data: Prisma.EmployeeUpdateInput): Promise<Employee>;
  delete(id: number): Promise<void>;
}