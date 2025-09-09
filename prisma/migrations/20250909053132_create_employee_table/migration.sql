-- CreateEnum
CREATE TYPE "public"."ContractType" AS ENUM ('FULL_TIME', 'PART_TIME', 'INTERN', 'TEMPORARY');

-- CreateEnum
CREATE TYPE "public"."SalaryType" AS ENUM ('EARNING', 'DEDUCTION');

-- CreateEnum
CREATE TYPE "public"."SalaryAmountType" AS ENUM ('FIXED', 'PERCENTAGE');

-- CreateEnum
CREATE TYPE "public"."StatusType" AS ENUM ('DRAFT', 'FINALIZED', 'PAID');

-- CreateEnum
CREATE TYPE "public"."LeaveType" AS ENUM ('ANNUAL', 'SICK', 'MATERNITY');

-- CreateTable
CREATE TABLE "public"."Employee" (
    "Employee_id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "national_id" INTEGER NOT NULL,
    "cnas_number" INTEGER NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "hire_date" TIMESTAMP(3) NOT NULL,
    "contract_Type" "public"."ContractType" NOT NULL,
    "position" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "work_location" TEXT NOT NULL,
    "bank_account" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("Employee_id")
);

-- CreateTable
CREATE TABLE "public"."SalaryComponent" (
    "component_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."SalaryType" NOT NULL,
    "amount_type" "public"."SalaryAmountType" NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "is_taxable" BOOLEAN NOT NULL,
    "is_cnassable" BOOLEAN NOT NULL,

    CONSTRAINT "SalaryComponent_pkey" PRIMARY KEY ("component_id")
);

-- CreateTable
CREATE TABLE "public"."Payroll" (
    "payroll_id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "pay_period" TIMESTAMP(3) NOT NULL,
    "gross_salary" DOUBLE PRECISION NOT NULL,
    "total_deductions" DOUBLE PRECISION NOT NULL,
    "net_salary" DOUBLE PRECISION NOT NULL,
    "status" "public"."StatusType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payroll_pkey" PRIMARY KEY ("payroll_id")
);

-- CreateTable
CREATE TABLE "public"."PayrollLine" (
    "payroll_line_id" SERIAL NOT NULL,
    "payroll_id" INTEGER NOT NULL,
    "component_id" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PayrollLine_pkey" PRIMARY KEY ("payroll_line_id")
);

-- CreateTable
CREATE TABLE "public"."Leave" (
    "leave_id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "leave_type" "public"."LeaveType" NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "approved_by" TEXT NOT NULL,
    "impact_on_pay" BOOLEAN NOT NULL,

    CONSTRAINT "Leave_pkey" PRIMARY KEY ("leave_id")
);

-- CreateTable
CREATE TABLE "public"."TaxBracket" (
    "bracket_id" SERIAL NOT NULL,
    "min_salary" DOUBLE PRECISION NOT NULL,
    "max_salary" DOUBLE PRECISION NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "deduction" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TaxBracket_pkey" PRIMARY KEY ("bracket_id")
);

-- CreateTable
CREATE TABLE "public"."CNASContribution" (
    "cnas_id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "month" TIMESTAMP(3) NOT NULL,
    "employee_contribution" DOUBLE PRECISION NOT NULL,
    "employer_contribution" DOUBLE PRECISION NOT NULL,
    "submitted" BOOLEAN NOT NULL,

    CONSTRAINT "CNASContribution_pkey" PRIMARY KEY ("cnas_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_national_id_key" ON "public"."Employee"("national_id");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_cnas_number_key" ON "public"."Employee"("cnas_number");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_bank_account_key" ON "public"."Employee"("bank_account");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "public"."Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_phone_key" ON "public"."Employee"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_username_key" ON "public"."Employee"("username");

-- AddForeignKey
ALTER TABLE "public"."Payroll" ADD CONSTRAINT "Payroll_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."Employee"("Employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PayrollLine" ADD CONSTRAINT "PayrollLine_payroll_id_fkey" FOREIGN KEY ("payroll_id") REFERENCES "public"."Payroll"("payroll_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PayrollLine" ADD CONSTRAINT "PayrollLine_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "public"."SalaryComponent"("component_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Leave" ADD CONSTRAINT "Leave_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."Employee"("Employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CNASContribution" ADD CONSTRAINT "CNASContribution_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."Employee"("Employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;
