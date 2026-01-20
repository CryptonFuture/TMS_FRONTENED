import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignFormService } from 'src/app/core/services/assignForm.services';
import { ClientsServices } from 'src/app/core/services/clients.services';
import { TaskService } from 'src/app/core/services/task.services';
import { UserService } from 'src/app/core/services/user.services';
import { assignEmployeeForm } from 'src/app/shared/interface/assignEmployee.interface';
import { clientsFormInterface } from 'src/app/shared/interface/clients.interface';
import { TaskFormInterface } from 'src/app/shared/interface/task.interface';
import { UserFormInterface } from 'src/app/shared/interface/user.interface';


@Component({
  selector: 'assign-employee-form',
  templateUrl: 'assign-employee-form.component.html',
  styleUrls: ['assign-employee-form.component.scss']
})
export class AssignEmployeeFormComponent {

  employeeActiveList: UserFormInterface[] = [];
  clientExistList: clientsFormInterface[] = [];
  taskActiveList: TaskFormInterface[] = [];
  assignForm: FormGroup | any;

  editMode = false;
  editAssignClientId: string | null = null;

  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private routes: Router,
    private userServices: UserService,
    private fb: FormBuilder,
    private assignFormServices: AssignFormService,
    private clientsServices: ClientsServices,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private taskServices: TaskService,

  ) { }

  ngOnInit(): void {
    this.loadEmployeeActiveList();
    this.loadclientsExistList();
    this.loadTaskList();
    this.initialize();

    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params.id) {
        this.editMode = true;
        this.editAssignClientId = String(params['id']);
        this.loadAssignClientForEdit(this.editAssignClientId);
      }
    });
  }

  initialize(): void {
    this.assignForm = this.fb.group({
      userEmployeeId: ['', Validators.required],
      clientId: ['', Validators.required],
      taskId: ['', Validators.required],
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
      taskId: formData.taskId,
      description: formData.description,
    };

    if (this.editMode) {
      const assignClientId = String(this.editAssignClientId);

      this.assignFormServices.editAssignData(assignClientId, payload).subscribe({
        next: (response: any) => {
          this.loading = false;
          this.assignForm.reset();
          this.routes.navigateByUrl('app/assign-employee-to-client/assign/assignAllocation');

          this.snackBar.open(response.message || 'Assign Client updated successfully', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success'],
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        },
        error: (err: any) => {
          this.loading = false;

          const backendMessage = err?.error?.message || err?.message || 'Something went wrong';

          if (backendMessage.toLowerCase().includes('already assigned')) {
            this.assignForm.get('clientId')?.setErrors({ duplicate: true });
          }

          this.snackBar.open(backendMessage, 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error'],
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }

      });

    } else

      this.assignFormServices.addAssignFormData(payload).subscribe({
        next: (res) => {
          this.loading = false;
          this.assignForm.reset();
          this.routes.navigateByUrl('app/assign-employee-to-client/assign/assignAllocation');


          this.snackBar.open(res.message || ' Client assigned successfully', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success'],
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        },
        error: (err) => {
          this.loading = false;

          if (
            err.message &&
            err.message.toLowerCase().includes('already assigned')
          ) {
            this.assignForm.get('clientId')?.setErrors({ duplicate: true });
          }

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

  loadTaskList() {
    this.taskServices.getTaskData().subscribe(
      (data: TaskFormInterface[]) => {
        this.taskActiveList = data.filter(task => task.status === 'Active');
      }
    );
  }



  loadAssignClientForEdit(clientId: string): void {
    this.assignFormServices.getAssignById(clientId).subscribe(
      (res: any) => {

        const data = res.data ?? res;

        this.assignForm.patchValue({
          userEmployeeId: data.userEmployeeId?._id,
          clientId: data.clientId?._id,
          taskId: data.taskId?._id,
          description: data.description
        });

      }
    );
  }







  goToAssignClientList(): void {
    this.routes.navigateByUrl('app/assign-employee-to-client/assign/assignAllocation');
  }


}
