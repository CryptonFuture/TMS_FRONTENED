import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {  Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.services';
import { UserFormInterface } from 'src/app/shared/interface/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/component/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'employee-list-active',
  templateUrl: 'employee-list-active.component.html',
  styleUrls: ['employee-list-active.component.scss']
})
export class EmployeeListActiveComponent implements OnInit {
  displayedColumns: string[] = [
    'no', 'name', 'email', 'address','designName', 'contactNo', 'department',
    'status', 'joinDate', 'description', 'action'
  ];
  dataSource = new MatTableDataSource<UserFormInterface>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


constructor(
  private routes: Router,
  private userservices: UserService,
  private dialog: MatDialog,
  private snackBar:MatSnackBar
) {}

  ngOnInit(): void {
  this.getUserData();

  this.dataSource.filterPredicate = (data: UserFormInterface, filter: string) => {
    const searchStr = (data.name + data.email).toLowerCase();
    return searchStr.includes(filter);
  };

  this.dataSource.sortingDataAccessor = (item: any, property: string) => {

    switch (property) {

      case 'contactNo':
        return Number(item.contactNo || item.phone || 0); 


      default:
        return item[property];
    }
  };
}


  getUserData() {
  this.userservices.getUserData().subscribe(
    (data: any) => {
      this.dataSource.data = data.filter(
        (user: UserFormInterface) => user.status !== 'unActive'
      );
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log('Filtered Users (excluding Unactive):', this.dataSource.data);
    },
    (error: any) => {
      console.log('Fetching Error', error);
    }
  );
}


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  editEmployee(user:UserFormInterface):void{
        this.routes.navigate(['app/user-managment/employee/employeeForm'],{queryParams:{id : user._id}})

     }
     

  deleteEmployee(userid?: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: 'Are you sure you want to delete this User?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userservices.deleteUserById(userid || '').subscribe(
          () => {
            this.dataSource.data = this.dataSource.data.filter((p) => p._id !== userid);
            this.snackBar.open('✅ User deleted successfully!', 'Close', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
          },
          (error: any) => {
            console.error('Error Deleting user:', error);
            this.snackBar.open('❌ Failed to delete user!', 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
        );
      }
    });
  }


  viewEmployee(employee: UserFormInterface) {
    localStorage.setItem('viewEmployee', JSON.stringify(employee));
    this.routes.navigate(['/employee/view']);
  }

  goToUnactiveEmployee() {
    this.routes.navigate(['app/user-managment/employee/employeeListUnactive']);
  }

  createEmployee() {
    this.routes.navigate(['app/user-managment/employee/employeeForm']);
  }
  assignEmployeeToClient(){
    this.routes.navigate(['app/assign-employee-to-client/assign/assignEmployeeForm'])
  }
}
