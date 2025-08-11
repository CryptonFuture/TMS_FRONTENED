import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-feature-layout',
  templateUrl: './feature-layout.component.html',
  styleUrls: ['./feature-layout.component.scss']
})
export class FeatureLayoutComponent {
  isExpanded = false;
  selected = '';

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  goToPage(route: string) {
    this.selected = route;
    this.router.navigateByUrl(`/${route}`);
  }
}
