import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { RoleService } from 'src/app/core/role/role.service';

@Component({
    // moduleId: module.id,
    selector: 'loginscreen',
    templateUrl: 'loginscreen.component.html',
    styleUrls: ['loginscreen.component.scss']
})
export class LoginscreenComponent implements OnInit, OnDestroy {
    signInForm: FormGroup
    role: any[] = []
    private destroy$ = new Subject<void>();

    constructor(private _roleServices: RoleService, private _authService: AuthService, private _matSnackBar: MatSnackBar, private _router: Router, private fb: FormBuilder) {
        this.signInForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            role: ['', Validators.required]
        })
    }

    ngOnInit(): void {
        this._roleServices.getRoles().pipe(takeUntil(this.destroy$)).subscribe(response => {
        this.role = response

        console.log(this.role, 'role');
        
    })
    }

    ngOnDestroy(): void {
        this.destroy$.next()
        this.destroy$.complete()
    }

     submit(): void {
      if (this.signInForm.invalid) {
        return;
      }
      this.signInForm.disable()
      this._authService.login(this.signInForm.value).subscribe({
        next: (response) => {
          this.signInForm.enable()
          if(response.success) {
            this._matSnackBar.open(response.message, 'x', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            })
          
            setTimeout(() => {
              this._router.navigateByUrl('dashboard')
            }, 1500)
          } else {
             this._matSnackBar.open(response.error?.error || 'Login failed. Please try again.', 'x', {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
          }
        },
        error: (err) => {
          this.signInForm.enable()
          console.log(err);
          
        }
      })
    
 
  }





}
