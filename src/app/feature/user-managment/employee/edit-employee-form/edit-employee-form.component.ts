import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { EmployeeService } from 'src/app/core/employee/employee.service';
import { RoleService } from 'src/app/core/role/role.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-employee-form',
  templateUrl: './edit-employee-form.component.html',
  styleUrls: ['./edit-employee-form.component.scss']
})
export class EditEmployeeFormComponent implements OnInit, OnDestroy {

  des: any[] = []
  dep: any[] = []
  role: any[] = []
  employeeId: any
  editEmployeeForm: FormGroup
  private destroy$ = new Subject<void>();
  
  constructor(private _activeRoute: ActivatedRoute, private _matSnackBar: MatSnackBar, private fb: FormBuilder, private _empService: EmployeeService, private _roleService: RoleService, private router: Router) {
     this.editEmployeeForm = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^\+92\d{10}$/)]],
        address: ['', [Validators.required]],
        designName: ['', [Validators.required]],
        department: ['', [Validators.required]],
        joiningDate: ['', [Validators.required]],
        description: [''],
        role: [''],
        active: [''],
        is_admin: ['']
      })  
  }

  goToActiveEmployeeList() {
    this.router.navigate(['app/user-managment/employee/employeeListActive']);
  }

  ngOnInit(): void {
    this.getDesDep()
    this.getRole()

    this.employeeId = this._activeRoute.snapshot.paramMap.get('id')

    if(this.employeeId) {
      this._empService.editEmpById(this.employeeId).pipe(takeUntil(this.destroy$)).subscribe(res => {
         if (res && res.data) {
        const joiningDateFormatted = res.data.joiningDate
          ? new Date(res.data.joiningDate).toISOString().split('T')[0]
          : '';
          

        this.editEmployeeForm.patchValue({
         
          name: res.data.name,
          email: res.data.email,
          address: res.data.address,
          phone: res.data.phone,
          department: res.data.department,
          role: res.data.role,
          designName: res.data.designName,
          joiningDate: joiningDateFormatted,
          description: res.data.description,
          active: res.data.active,
          is_admin: res.data.is_admin
        })
        }
      })
    }
    
  }

  getDesDep(): void {
    this._empService.getDesDep().pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.des = res.designation
      this.dep = res.department  
    })
  }

  getRole(): void {
     this._roleService.getRoles().pipe(takeUntil(this.destroy$)).subscribe(response => {
        this.role = response        
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

onSubmit() {
   if(this.editEmployeeForm.invalid) {
        return
      }
      this.editEmployeeForm.disable()
      this._empService.updateUser(this.employeeId, this.editEmployeeForm.value).subscribe({
        next: (response) => {
          this.editEmployeeForm.enable()
           if(response.success) {
              this._matSnackBar.open(response.message, 'x', {
                duration: 1500,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              })
              Object.keys(this.editEmployeeForm.controls).forEach(key => {
                this.editEmployeeForm.get(key)?.setErrors(null);
              });
              setTimeout(() => {
                this.router.navigate(['app/user-managment/employee/employeeListActive'])
              }, 1500)
            } else {
               this._matSnackBar.open(response.error?.error || 'Login failed. Please try again.', 'x', {
                duration: 2000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              });
            }
        },
        error: (err: any) => {
          this.editEmployeeForm.enable()
          console.log(err);
  
        Object.keys(this.editEmployeeForm.controls).forEach(key => {
          this.editEmployeeForm.get(key)?.setErrors(null);
        });
  
        this._matSnackBar.open('Something went wrong. Please try again.', 'x', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
          
        }
      })
    }

}
