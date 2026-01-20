import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.services';

@Component({
    // moduleId: module.id,
    selector: 'loginscreen',
    templateUrl: 'loginscreen.component.html',
    styleUrls: ['loginscreen.component.scss']
})
export class LoginscreenComponent {

    loginForm:FormGroup | any;
    loginError : String |null = null;

    constructor(private fb:FormBuilder, private routes:Router, private authServices:AuthService, private snackBar:MatSnackBar){

        this.loginForm = this.fb.group({
            email:['',(Validators.required)],
            password:['',(Validators.required)],

        })
    }





    submit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authServices.login({ email, password }).subscribe(
        (response: any) => {
          if (response.user && response.user.status === 'unactive') {
            this.snackBar.open('⚠️ Your account is unactive. Please contact admin.', 'Close', {
              duration: 4000,
              panelClass: ['warn-snackbar']
            });
            return;
          }

          this.snackBar.open('✅ Login Successful! Welcome back.', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });

          localStorage.setItem(
            'loginUserInfo',
            JSON.stringify({ authToken: response.user?._id, user: response.user })
          );

          this.routes.navigateByUrl('/app/dashboard');
        },
       (error: any) => {
  console.log("Error:", error);

  if (error?.status === 403) {
    this.snackBar.open('⚠️ Your account is inactive. Please contact admin.', 'Close', {
      duration: 4000,
      panelClass: ['warn-snackbar']
    });
  } else if (error?.status === 401) {
    this.snackBar.open('❌ Invalid email or password!', 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  } else {
    this.snackBar.open('❌ Something went wrong. Try again later.', 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

        }
      );
    }
  }
}

    


