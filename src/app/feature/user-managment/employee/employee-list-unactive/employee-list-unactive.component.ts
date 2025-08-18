import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { EmployeeService } from 'src/app/core/employee/employee.service';

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
export class EmployeeListUnactiveComponent implements OnInit,OnDestroy {
  displayedColumns: string[] = [
    'no', 'name', 'email', 'address', 'contactNo', 'department',
    'status', 'joinDate', 'description', 'action'
  ];
  dataSource = new MatTableDataSource<Employee>([]);

   private destroy$ = new Subject<void>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _matSnackBar: MatSnackBar, private router: Router, private _empServices: EmployeeService) {}

  ngOnInit(): void {
    this.loadUnactiveEmployees();
    this.getInActiveEmp()
    
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  getInActiveEmp(): void {
    this._empServices.getInActiveEmp().pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.dataSource = res

      console.log(this.dataSource, 'data');
      
    })
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

  editEmployee(id: string) {
    this.router.navigate(['app/user-managment/employee/edit-employee-form', id]);
  }

  viewEmployee(id: string) {
    this.router.navigate(['app/user-managment/employee/view-employee-list', id]);
  }

  goToActiveEmployee() {
    this.router.navigate(['app/user-managment/employee/employeeListActive']);
  }

  createEmployee() {
    this.router.navigate(['app/user-managment/employee/employeeForm']);
  }

       onDelete(id: string): void {
           this._empServices.deleteEmp(id).subscribe({
        next: (response) => {
          if(response.success) {
             this._matSnackBar.open(response.message, 'x', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            })

          } else {
             this._matSnackBar.open(response.error || 'Login failed. Please try again.', 'x', {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
          }
          this.getInActiveEmp()

        },
        error: (err) => {
           const errorMessage = err?.error?.error || 'Something went wrong on server.';
            this._matSnackBar.open(errorMessage, 'x', {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
          
        }
      })
        }
}
