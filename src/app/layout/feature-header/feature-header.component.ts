import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'feature-header',
  templateUrl: './feature-header.component.html',
  styleUrls: ['./feature-header.component.scss']
})
export class FeatureHeaderComponent {
  @Output() toggle = new EventEmitter<void>();

  constructor(private router: Router) {}

  onMenuClick() {
    this.toggle.emit();
  }

  logout() {
    localStorage.removeItem('loginUserInfo');

    this.router.navigateByUrl('feature/login');
  }
}
