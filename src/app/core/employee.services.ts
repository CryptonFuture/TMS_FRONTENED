import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employees: any[] = [];

  constructor() {}

  addEmployee(employee: any) {
    this.employees.push(employee);
  }

  getEmployeesByStatus(status: string) {
    return this.employees.filter(emp => emp.status.toLowerCase() === status.toLowerCase());
  }

  getAllEmployees() {
    return this.employees;
  }
}
