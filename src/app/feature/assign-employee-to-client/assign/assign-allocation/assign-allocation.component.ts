import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AssignFormService } from 'src/app/core/services/assignForm.services';
import { ConfirmDialogComponent } from 'src/app/shared/component/confirm-dialog/confirm-dialog.component';
import { assignEmployeeForm } from 'src/app/shared/interface/assignEmployee.interface';

@Component({
    // moduleId: module.id,
    selector: 'assign-allocation',
    templateUrl: 'assign-allocation.component.html',
    styleUrls: ['assign-allocation.component.scss']
})
export class AssignAllocationComponent implements OnInit {

    displayedColumns: string[] = [
        'no', 'employee', 'client','task', 'description', 'action'
    ];


    dataSource = new MatTableDataSource<assignEmployeeForm>([]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private AssignService: AssignFormService,
        private router: Router,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) { }

ngOnInit(): void {
  this.getAssignClient();

  this.dataSource.filterPredicate = (data: any, filter: string) => {
    const searchStr =
      (data.userEmployeeId?.name + data.clientId?.name).toLowerCase();
    return searchStr.includes(filter);
  };
}

getAssignClient() {
  this.AssignService.getAssignData().subscribe(
    (res: any) => {
      this.dataSource.data = res.data;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      // 👇 CUSTOM SORTING FOR NESTED OBJECTS
      this.dataSource.sortingDataAccessor = (item: any, property: string) => {

        switch (property) {

          case 'employee':
            return item.userEmployeeId?.name?.toLowerCase() || '';

          case 'client':
            return item.clientId?.name?.toLowerCase() || '';

          case 'task':
            return item.taskId?.name?.toLowerCase() || '';

          case 'description':
            return item.description?.toLowerCase() || '';

          default:
            return item[property];
        }
      };

    },
    (error) => {
      console.log(error);
    }
  );
}



    selectedTab = 0;


    onTabChange(index: number) {
        this.selectedTab = index;

        if (index === 0) {
            this.router.navigate(['app/assign-employee-to-client/assign/assignAllocation']);
        } else if (index === 1) {
            this.router.navigate(['app/assign-employee-to-client/assign/assignNonAllocation']);
        }
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
        this.dataSource.filter = filterValue;
    }


    createAssignclient() {
        this.router.navigate(['app/assign-employee-to-client/assign/assignEmployeeForm']);
    }

    editAssignclient(client: assignEmployeeForm) {
        this.router.navigate(['app/assign-employee-to-client/assign/assignEmployeeForm'], {
            queryParams: { id: client._id }
        });
    }

    deleteAssignclient(id?: string) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: "350px",
            data: { message: "Are you sure you want to delete this Assign Client?" }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.AssignService.deleteAssignById(id || '').subscribe(
                    () => {
                        this.dataSource.data = this.dataSource.data.filter(c => c._id !== id);

                        this.snackBar.open("Assign Client deleted successfully!", "Close", {
                            duration: 3000,
                            panelClass: ["success-snackbar"]
                        });
                    },
                    (error: any) => {
                        console.error("Delete Error:", error);

                        this.snackBar.open("Failed to delete client!", "Close", {
                            duration: 3000,
                            panelClass: ["error-snackbar"]
                        });
                    }
                );
            }
        });
    }


    

}
