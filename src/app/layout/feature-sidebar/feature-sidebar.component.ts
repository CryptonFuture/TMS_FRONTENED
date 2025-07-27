import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'feature-sidebar',
  templateUrl: './feature-sidebar.component.html',
  styleUrls: ['./feature-sidebar.component.scss']
})
export class FeatureSidebarComponent {
    constructor(private routes:Router){}
isExpanded = false;
selected = 'dashboard';

toggleSidebar() {
  this.isExpanded = !this.isExpanded;
}


  goToPage(route: string) {
  this.selected = route;
  this.routes.navigate([route]);
}

}
