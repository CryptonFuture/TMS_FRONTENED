import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.services';
import { UserFormInterface } from 'src/app/shared/interface/user.interface';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent implements OnInit {

  employeeForm!: FormGroup;
  editMode = false;
  editUserId: string | null = null;

  constructor(
    private routes: Router,
    private userServices: UserService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initialize();

    this.activeRoute.queryParams.subscribe((params: any) => {
      if (params.id) {
        this.editMode = true;
        this.editUserId = String(params['id']);
        this.loadUserForEdit(this.editUserId);
      }
    });

  }

  initialize(): void {
    this.employeeForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', Validators.required],
      phone: ['', [Validators.required,Validators.pattern(/^92[0-9]{10}$/)]],
      address: ['', Validators.required],
      designName: ['', Validators.required],
      department: ['', Validators.required],
      joiningDate: ['', Validators.required],
      description: [''],
      accsessToken: [''],
      refreshToken: [''],
      status: ['unActive'],
      //   is_admin: [false],
      is_deleted: [false],
      createdAt: [''],
      updatedAt: ['']
    }, { validators: this.passwordMatchValidator });
  }

 onPhoneInput(): void {
  const ctrl = this.employeeForm.get('phone');
  if (!ctrl) return;

  let value = ctrl.value || '';

  // sirf digits
  value = value.replace(/\D/g, '');

  if (value.startsWith('03')) {
    value = value.substring(1);
  }

  if (value.startsWith('3')) {
    value = '92' + value;
  }

  value = value.substring(0, 12);

  ctrl.setValue(value, { emitEvent: false });
}


  


  passwordMatchValidator(group: FormGroup) {
    const passCtrl = group.get('password');
    const confirmCtrl = group.get('confirmPass');

    if (!passCtrl || !confirmCtrl) return null;

    if (!passCtrl.value || !confirmCtrl.value) return null;

    if (passCtrl.value !== confirmCtrl.value) {
      confirmCtrl.setErrors({ passwordMismatch: true });
      return null;
    }

    // clear error if match
    if (confirmCtrl.hasError('passwordMismatch')) {
      confirmCtrl.setErrors(null);
    }

    return null;
  }


  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const formData = this.employeeForm.getRawValue();

    const payload: any = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      designName: formData.designName,
      department: formData.department,
      joiningDate: formData.joiningDate,
      description: formData.description,
      status: formData.status,
      is_deleted: formData.is_deleted
    };

    if (!this.editMode) {
      payload.password = formData.password;
      payload.confirmPass = formData.confirmPass;
    }

    if (this.editMode) {
      this.userServices.editUserData(this.editUserId!, payload).subscribe(() => {
        this.routes.navigateByUrl('app/user-managment/employee/employeeListActive');
      });
    } else {
      this.userServices.addUserData(payload).subscribe({
        next: () => {
          this.routes.navigateByUrl('app/user-managment/employee/employeeListActive');
        },
        error: (err) => {

          if (err.error?.field === 'password') {
            this.employeeForm.setErrors({ passwordMismatch: true });
            this.employeeForm.get('confirmPass')?.markAsTouched();
          }

          if (err.error?.field === 'email') {
            this.employeeForm.get('email')?.setErrors({ duplicate: true });
          }
        }
      });

    }
  }


  loadUserForEdit(userId: string): void {
    this.userServices.getUserById(userId).subscribe(user => {

      this.employeeForm.patchValue({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        designName: user.designName,
        department: user.department,
        joiningDate: user.joiningDate,
        description: user.description,
        status: user.status
      });

      // Disable name & email
      this.employeeForm.get('name')?.disable();
      this.employeeForm.get('email')?.disable();

      // Remove password validators
      this.employeeForm.get('password')?.clearValidators();
      this.employeeForm.get('confirmPass')?.clearValidators();

      this.employeeForm.get('password')?.updateValueAndValidity();
      this.employeeForm.get('confirmPass')?.updateValueAndValidity();
    });
  }





  goToActiveEmployeeList(): void {
    this.routes.navigateByUrl('app/user-managment/employee/employeeListActive');
  }


}
