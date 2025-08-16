import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { EmployeeService } from 'src/app/core/employee/employee.service';
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'

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
export class EmployeeListActiveComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'no', 'name', 'email', 'address', 'contactNo', 'department',
    'status', 'joinDate', 'description', 'action'
  ];
  dataSource = new MatTableDataSource<Employee>([]);

  private destroy$ = new Subject<void>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _matSnackBar: MatSnackBar, private _matDialog: MatDialog, private router: Router, private _empServices: EmployeeService) {}

  ngOnInit(): void {
    this.loadActiveEmployees();

    // Yeh custom filter set karega taake name OR email dono match ho sake
    this.dataSource.filterPredicate = (data: Employee, filter: string) => {
      const searchStr = (data.name + data.email).toLowerCase();
      return searchStr.includes(filter);
    };

    this.getActiveEmp()
    
  }

  getActiveEmp(): void {
    this._empServices.getActiveEmp().pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.dataSource = res

      console.log(this.dataSource, 'data');
      
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
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

  editEmployee(id: string) {
    this.router.navigate(['app/user-managment/employee/edit-employee-form', id]);
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
          this.getActiveEmp()

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
