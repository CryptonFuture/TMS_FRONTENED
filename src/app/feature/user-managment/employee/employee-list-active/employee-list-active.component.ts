import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface Employee {
  name: string;
  email: string;
  address: string;
  contactNo: string;
  department: string;
  status: string;
  joinDate: string;
  description: string;
}

@Component({
  selector: 'employee-list-active',
  templateUrl: 'employee-list-active.component.html',
  styleUrls: ['employee-list-active.component.scss']
})
export class EmployeeListActiveComponent implements OnInit {
  displayedColumns: string[] = [
    'no', 'name', 'email', 'address', 'contactNo', 'department',
    'status', 'joinDate', 'description', 'action'
  ];
  dataSource = new MatTableDataSource<Employee>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadActiveEmployees();

    // Yeh custom filter set karega taake name OR email dono match ho sake
    this.dataSource.filterPredicate = (data: Employee, filter: string) => {
      const searchStr = (data.name + data.email).toLowerCase();
      return searchStr.includes(filter);
    };
  }

  loadActiveEmployees() {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const activeEmployees = employees.filter((emp: any) => emp.status?.toLowerCase() === 'active');
    this.dataSource.data = activeEmployees;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  editEmployee(employee: Employee) {
    localStorage.setItem('editEmployee', JSON.stringify(employee));
    this.router.navigate(['app/user-managment/employee/employeeForm']);
  }

  deleteEmployee(employee: Employee) {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const updatedEmployees = employees.filter((emp: any) => emp.email !== employee.email);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    this.loadActiveEmployees();
  }

  viewEmployee(employee: Employee) {
    localStorage.setItem('viewEmployee', JSON.stringify(employee));
    this.router.navigate(['/employee/view']);
  }

  goToUnactiveEmployee() {
    this.router.navigate(['app/user-managment/employee/employeeListUnactive']);
  }

  createEmployee() {
    this.router.navigate(['app/user-managment/employee/employeeForm']);
  }
}
