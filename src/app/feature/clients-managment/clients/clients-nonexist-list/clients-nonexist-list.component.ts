import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ClientsServices } from 'src/app/core/services/clients.services';
import { ConfirmDialogComponent } from 'src/app/shared/component/confirm-dialog/confirm-dialog.component';
import { clientsFormInterface } from 'src/app/shared/interface/clients.interface';

@Component({
  selector: 'clients-nonexist-list',
  templateUrl: 'clients-nonexist-list.component.html',
  styleUrls: ['clients-nonexist-list.component.scss']
})
export class ClientsNonexistListComponent implements OnInit {

displayedColumns: string[] = [
  'no', 'name', 'email', 'password', 'address',
  'contactNo', 'status', 'startTime', 'endTime', 'description', 'action'
];

dataSource = new MatTableDataSource<clientsFormInterface>([]);

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;


constructor(
  private clientService: ClientsServices,
  private router: Router,
  private dialog: MatDialog,
  private snackBar: MatSnackBar
) {}
ngOnInit(): void {
  this.loadClients();

  this.dataSource.filterPredicate = (data: clientsFormInterface, filter: string) => {
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

loadClients() {
  this.clientService.getClientsData().subscribe(
    (data: any) => {

      this.dataSource.data = data.filter(
  (client: clientsFormInterface) => client.status === 'nonExist'
);



      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("Exist Clients:", this.dataSource.data);
    },
    (error: any) => {
      console.error("Fetching error:", error);
    }
  );
}



applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.dataSource.filter = filterValue;
}

selectedTab = 1;


onTabChange(index: number) {
  this.selectedTab = index;

  if (index === 0) {
    // Exist Client Form
    this.router.navigate(['app/clients-managment/clients/clientsExistList']);
  } else if (index === 1) {
    // Non Exist Client Form
    this.router.navigate(['app/clients-managment/clients/clientsNonExistList']);
  }
}

createClients() {
  this.router.navigate(['app/clients-managment/clients/clientsForm']);
}

editClient(client: clientsFormInterface) {
  this.router.navigate(['app/clients-managment/clients/clientsForm'], {
    queryParams: { id: client._id }
  });
}

deleteClient(id?: string) {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: "350px",
    data: { message: "Are you sure you want to delete this Client?" }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.clientService.deleteClientsById(id || '').subscribe(
        () => {
          this.dataSource.data = this.dataSource.data.filter(c => c._id !== id);

          this.snackBar.open("Client deleted successfully!", "Close", {
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

viewClient(id?: string) {
  this.router.navigate(['app/client-managment/clients/view'], {
    queryParams: { id: id }
  });
}

}
