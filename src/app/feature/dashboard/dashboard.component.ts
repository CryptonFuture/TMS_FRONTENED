import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.services';
import { ClientsServices } from 'src/app/core/services/clients.services';
import { UserFormInterface } from 'src/app/shared/interface/user.interface';
import { clientsFormInterface } from 'src/app/shared/interface/clients.interface';


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // Employees
  totalUsers = 0;
  activeUsers = 0;
  inactiveUsers = 0;

  // Clients
  totalClients = 0;
  activeClients = 0;
  inactiveClients = 0;


  constructor(
    private userService: UserService,
    private clientService: ClientsServices,

  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadClients();

  }

  // ===== Users =====
  loadUsers() {
    this.userService.getUserData().subscribe((users: UserFormInterface[]) => {
      this.totalUsers = users.length;
      this.activeUsers = users.filter(u => u.status === 'Active').length;
      this.inactiveUsers = users.filter(u => u.status === 'unActive').length;
    });
  }

  // ===== Clients =====
  loadClients() {
    this.clientService.getClientsData().subscribe((clients: clientsFormInterface[]) => {
      this.totalClients = clients.length;
      this.activeClients = clients.filter(c => c.status === 'Exist').length;
      this.inactiveClients = clients.filter(c => c.status === 'nonExist').length;
    });
  }

}
