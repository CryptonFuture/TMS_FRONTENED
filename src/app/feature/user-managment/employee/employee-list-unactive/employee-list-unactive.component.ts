import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.services';
import { ConfirmDialogComponent } from 'src/app/shared/component/confirm-dialog/confirm-dialog.component';
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
 
   constructor(private routes: Router, private userservices:UserService, private snackBar:MatSnackBar,private dialog:MatDialog ) {}
 
   ngOnInit(): void {
     this.getUserData();
     

      this.dataSource.filterPredicate = (data: UserFormInterface, filter: string) => {
      const searchStr = (data.name + data.email).toLowerCase();
      return searchStr.includes(filter);
 
      }
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  
}
