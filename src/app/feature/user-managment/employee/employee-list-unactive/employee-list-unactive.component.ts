import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.services';
import { UserFormInterface } from 'src/app/shared/interface/user.interface';



@Component({
  selector: 'employee-list-unactive',
  templateUrl: 'employee-list-unactive.component.html',
  styleUrls: ['employee-list-unactive.component.scss']
})
export class EmployeeListUnactiveComponent implements OnInit {
  displayedColumns: string[] = [
     'no', 'name', 'email','password', 'address','designName', 'contactNo', 'department',
     'status', 'joinDate', 'description', 'action'
   ];
   dataSource = new MatTableDataSource<UserFormInterface>([]);
 
   @ViewChild(MatPaginator) paginator!: MatPaginator;
 
   constructor(private routes: Router, private userservices:UserService ) {}
 
   ngOnInit(): void {
     this.getUserData();
 
     
   }
 
   getUserData(){
         this.userservices.getUserData().subscribe((data:any)=>{
            this.dataSource.data = data.filter((user: UserFormInterface) => 
           user.status === 'unactive' 
           );
       console.log('Filtered Users (Unactive):', this.dataSource.data);
 
         },
         (error:any)=>{
            console.log('Fetching Error',error)
         }
     )
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

  goToActiveEmployee() {
    this.routes.navigate(['app/user-managment/employee/employeeListActive']);
  }

  createEmployee() {
    this.routes.navigate(['app/user-managment/employee/employeeForm']);
  }
}
