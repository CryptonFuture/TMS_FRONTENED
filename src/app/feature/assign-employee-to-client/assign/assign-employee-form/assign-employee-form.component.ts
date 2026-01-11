import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AssignFormService } from 'src/app/core/services/assignForm.services';
import { ClientsServices } from 'src/app/core/services/clients.services';
import { UserService } from 'src/app/core/services/user.services';
import { assignEmployeeForm } from 'src/app/shared/interface/assignEmployee.interface';
import { clientsFormInterface } from 'src/app/shared/interface/clients.interface';
import { UserFormInterface } from 'src/app/shared/interface/user.interface';


@Component({
  selector: 'assign-employee-form',
  templateUrl: 'assign-employee-form.component.html',
  styleUrls: ['assign-employee-form.component.scss']
})
export class AssignEmployeeFormComponent {

  employeeActiveList: UserFormInterface[] = [];
  clientExistList: clientsFormInterface[] = [];
  assignForm: FormGroup | any;

  loading = false;           
  successMessage = '';      
  errorMessage = '';          

  constructor(
    private routes: Router,
    private userServices: UserService,
    private fb: FormBuilder,
    private assignFormServices: AssignFormService,
    private clientsServices: ClientsServices,
    private snackBar : MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadEmployeeActiveList();
    this.loadclientsExistList();
    this.initialize();
  }

  initialize(): void {
    this.assignForm = this.fb.group({
      userEmployeeId: ['', Validators.required],
      clientId: ['', Validators.required],
      description: [''],
    });
  }

  onSubmit() {
  if (this.assignForm.invalid) {
    this.assignForm.markAllAsTouched();
    return;
  }

  this.loading = true;

  const formData = this.assignForm.value;

  const payload: assignEmployeeForm = {
    userEmployeeId: formData.userEmployeeId,
    clientId: formData.clientId,
    description: formData.description,
  };

  this.assignFormServices.addAssignFormData(payload).subscribe({
    next: (res) => {
      this.loading = false;
      this.assignForm.reset();

      this.snackBar.open(res.message || 'Client assigned successfully', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-success'],
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    },
    error: (err) => {
      this.loading = false;

      if (err.message.includes('pehle hi assign')) {
        this.assignForm.get('clientId')?.setErrors({ duplicate: true });
      }

      // 🔹 Error Snackbar
      this.snackBar.open(err.message || 'Something went wrong', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error'],
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    }
  });
}


  loadEmployeeActiveList() {
    this.userServices.getUserData().subscribe(
      (data: UserFormInterface[]) => {
        this.employeeActiveList = data.filter(user => user.status === 'Active');
      },
      error => console.log(error)
    );
  }

  loadclientsExistList() {
    this.clientsServices.getClientsData().subscribe(
      (data: clientsFormInterface[]) => {
        this.clientExistList = data.filter(client => client.status === 'Exist');
      },
      error => console.log(error)
    );
  }

}
