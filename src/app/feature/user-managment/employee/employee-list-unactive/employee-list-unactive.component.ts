import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface Employee {
  id: number;
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
  selector: 'employee-list-unactive',
  templateUrl: 'employee-list-unactive.component.html',
  styleUrls: ['employee-list-unactive.component.scss']
})
export class EmployeeListUnactiveComponent implements OnInit {
  displayedColumns: string[] = [
    'no', 'name', 'email', 'address', 'contactNo', 'department',
    'status', 'joinDate', 'description', 'action'
  ];
  dataSource = new MatTableDataSource<Employee>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUnactiveEmployees();

    
  }

  loadUnactiveEmployees() {
    const unactiveemployees = JSON.parse(localStorage.getItem('employees') || '[]');
    const unactiveEmployees =unactiveemployees.filter((emp: any) => emp.status?.toLowerCase() === 'inactive');
    this.dataSource.data = unactiveEmployees;
    this.dataSource.paginator = this.paginator;
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  deleteEmployee(employee: Employee) {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const updatedEmployees = employees.filter((emp: any) => emp.id !== employee.id);

    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    this.loadUnactiveEmployees();
  }

  editEmployee(employee: Employee) {
    localStorage.setItem('editEmployee', JSON.stringify(employee));
    this.router.navigate(['app/user-managment/employee/employeeForm']);
  }

  viewEmployee(employee: Employee) {
    localStorage.setItem('viewEmployee', JSON.stringify(employee));
    this.router.navigate(['/employee/view']);
  }

  goToActiveEmployee() {
    this.router.navigate(['app/user-managment/employee/employeeListActive']);
  }

  createEmployee() {
    this.router.navigate(['app/user-managment/employee/employeeForm']);
  }
}
