import { prisma } from '../database/prismaClient';
import { Prisma } from '../../generated/prisma';
import { type EmployeeRepository } from '../../domain/interfaces/EmployeeRepository';
import { type Employee as DomainEmployee } from '../../domain/entities/Employee';

export class PrismaEmployeeRepository implements EmployeeRepository {
  async create(data: Prisma.EmployeeCreateInput): Promise<DomainEmployee> {
    return prisma.employee.create({ data });
  }
  async findByEmail(email: string): Promise<DomainEmployee | null> {
    return prisma.employee.findUnique({ where: { email } });
  }
  async findById(id: number): Promise<DomainEmployee | null> {
    return prisma.employee.findUnique({ where: { Employee_id: id } });
  }
  async findAll(): Promise<DomainEmployee[]> {
    return prisma.employee.findMany();
  }
  async update(id: number, data: Prisma.EmployeeUpdateInput): Promise<DomainEmployee> {
    return prisma.employee.update({ where: { Employee_id: id }, data });
  }
  async delete(id: number): Promise<void> {
    await prisma.employee.delete({ where: { Employee_id: id } });
  }
}