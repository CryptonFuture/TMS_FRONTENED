import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.services';
import { UserFormInterface } from 'src/app/shared/interface/user.interface';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {   
  userData: UserFormInterface[] = [];

  constructor(private userServices: UserService) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.userServices.getUserData().subscribe(
      (data: UserFormInterface[]) => {
        this.userData = data.filter(user => user.status !== 'unactive');
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
