import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.services';
import { UserFormInterface } from 'src/app/shared/interface/user.interface';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent implements OnInit{

  employeeForm!: FormGroup;
  editMode = false;
  editUserId: string | null = null;

  constructor(
    private routes: Router,
    private userServices: UserService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {}

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
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', Validators.required],
      designName: ['', Validators.required],
      department: ['', Validators.required],
      joiningDate: ['', Validators.required],
      description: [''],
      accsessToken: [''],
      refreshToken: [''],
      status: ['Active'],
    //   is_admin: [false],
      is_deleted: [false],
      createdAt: [''],
      updatedAt: ['']
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('confirmPass')?.value;
    return pass === confirmPass ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    debugger
    if (this.employeeForm.invalid) {
      console.log('Form is invalid');
      this.employeeForm.markAllAsTouched();
      return;
    }

    const formData = this.employeeForm.value


    const payload: UserFormInterface = {
  _id: formData._id,
  name: formData.name,
  email: formData.email,
  password: formData.password,
  confirmPass: formData.confirmPass,
  phone: formData.phone,
  address: formData.address,
  designName: formData.designName,
  department: formData.department,
  joiningDate: formData.joiningDate,
  description: formData.description,
  accsessToken: formData.accsessToken,
  refreshToken: formData.refreshToken,
  status: formData.status,
//   is_admin: formData.is_admin,
  is_deleted: formData.is_deleted,
  createdAt: formData.createdAt,
  updatedAt: formData.updatedAt
};


    if (this.editMode) {
    const UserId = String (this.editUserId);

      this.userServices.editUserData(UserId, payload).subscribe({
        next: (response: any) => {
          console.log('User updated Successfully', response);

          this.employeeForm.reset();
          this.routes.navigateByUrl('app/user-managment/employee/employeeListActive');
        },
        error: (error: any) => {
          console.log('Error updating User:', error);
        }
      });
    } else {
      this.userServices.addUserData(payload).subscribe(
        (response: any) => {
          console.log('User added successfully', response);
          this.employeeForm.reset();
              this.routes.navigateByUrl('app/user-managment/employee/employeeListActive');

        },
         (error: any) => {
          console.log('Error adding User:', error);
        
      });
    }
  }

  loadUserForEdit(userId: string): void {
  this.userServices.getUserById(userId).subscribe(
    (user   ) => {

      this.employeeForm.patchValue({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        confirmPass: user.confirmPass,
        phone: user.phone,
        address: user.address,
        designName: user.designName,
        department: user.department,
        joiningDate: user.joiningDate,
        description: user.description,
        status:user.status,
      });
    }
  );
}


  

  goToActiveEmployeeList(): void {
    this.routes.navigateByUrl('app/user-managment/employee/employeeListActive');
  }

  
}
