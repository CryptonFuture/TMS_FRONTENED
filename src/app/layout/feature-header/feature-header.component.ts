import { Component, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'feature-header',
  templateUrl: './feature-header.component.html',
  styleUrls: ['./feature-header.component.scss']
})
export class FeatureHeaderComponent {
  @Output() toggle = new EventEmitter<void>();

  constructor(private _matSnackBar: MatSnackBar, private _router: Router, private _authServices: AuthService) {}

  onMenuClick() {
    this.toggle.emit();
  }

   onUserLoggedOut(): void {
    
    const id: any = localStorage.getItem('id')

    this._authServices.logout(id).subscribe({
      next: (response) => {
       if(response.success) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('id');
            localStorage.removeItem('email');
            localStorage.removeItem('tokenType');

            this._matSnackBar.open(response.message, 'x', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            })
          
            setTimeout(() => {
              this._router.navigateByUrl('')
            }, 1500)
          } else {
             this._matSnackBar.open(response.error?.error || 'Login failed. Please try again.', 'x', {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
          }
        
      },
      error: (error) => {
        console.log(error);
        
      }
    })
  }
}
