import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {  Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.services';
import { UserFormInterface } from 'src/app/shared/interface/user.interface';


@Component({
  selector: 'employee-list-active',
  templateUrl: 'employee-list-active.component.html',
  styleUrls: ['employee-list-active.component.scss']
})
export class EmployeeListActiveComponent implements OnInit {
  displayedColumns: string[] = [
    'no', 'name', 'email','password', 'address','designName', 'contactNo', 'department',
    'status', 'joinDate', 'description', 'action'
  ];
  dataSource = new MatTableDataSource<UserFormInterface>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private routes: Router, private userservices:UserService ) {}

  ngOnInit(): void {
    this.getUserData();

    this.dataSource.filterPredicate = (data: UserFormInterface, filter: string) => {
      const searchStr = (data.name + data.email).toLowerCase();
      return searchStr.includes(filter);
    };
  }

  getUserData() {
  this.userservices.getUserData().subscribe(
    (data: any) => {
      this.dataSource.data = data.filter(
        (user: UserFormInterface) => user.status !== 'unactive'
      );
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
  if (confirm('Are you sure want to delete this User?')) {
    this.userservices.deleteUserById(userid || '').subscribe(
      () => {
        this.dataSource.data = this.dataSource.data.filter((p) => p._id !== userid);
        alert('User deleted successfully');
      },
      (error: any) => {
        console.error('Error Deleting user:', error);
      }
    );
  }
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
