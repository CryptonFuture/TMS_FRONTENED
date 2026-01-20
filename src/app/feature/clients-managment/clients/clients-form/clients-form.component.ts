import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsServices } from 'src/app/core/services/clients.services';
import { clientsFormInterface } from 'src/app/shared/interface/clients.interface';

@Component({
  // moduleId: module.id,
  selector: 'clients-form',
  templateUrl: 'clients-form.component.html',
  styleUrls: ['clients-form.component.scss']
})
export class ClientsFormComponent {

  clientForm!: FormGroup;
  editMode = false;
  editClientId: string | null = null;

  constructor(
    private routes: Router,
    private clientsServices: ClientsServices,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initialize();

    this.activeRoute.queryParams.subscribe((params: any) => {
      if (params.id) {
        this.editMode = true;
        this.editClientId = String(params['id']);
        this.loadClientForEdit(this.editClientId);
      }
    });
  }

  initialize(): void {
    this.clientForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^92[0-9]{10}$/)]],
      address: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      description: [''],
      status: ['nonExist'],
      createdAt: [''],
      updatedAt: ['']
    }, { validators: this.passwordMatchValidator });
  }

  onPhoneInput(): void {
  const ctrl = this.clientForm.get('phone');
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
    debugger
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }

    const formData = this.clientForm.getRawValue();


    const payload: any = {
      _id: formData._id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      startTime: formData.startTime,
      endTime: formData.endTime,
      description: formData.description,
      status: formData.status,
      createdAt: formData.createdAt,
      updatedAt: formData.updatedAt
    };

        if (!this.editMode) {
      payload.password = formData.password;
      payload.confirmPass = formData.confirmPass;
    }



    if (this.editMode) {
      this.clientsServices.editClientsData(this.editClientId!, payload).subscribe(() => {
        this.routes.navigateByUrl('app/clients-managment/clients/clientsExistList');
      });
    } else {
      this.clientsServices.addClientsData(payload).subscribe({
        next: () => {
          this.routes.navigateByUrl('app/clients-managment/clients/clientsExistList');
        },
        error: (err) => {

          if (err.error?.field === 'password') {
            this.clientForm.setErrors({ passwordMismatch: true });
            this.clientForm.get('confirmPass')?.markAsTouched();
          }

          if (err.error?.field === 'email') {
            this.clientForm.get('email')?.setErrors({ duplicate: true });
          }
        }
      });
  
    }
    
  }

  loadClientForEdit(clientId: string): void {
    this.clientsServices.getClientsById(clientId).subscribe(
      (clients) => {

        this.clientForm.patchValue({
          _id: clients._id,
          name: clients.name,
          email: clients.email,
          phone: clients.phone,
          address: clients.address,
          startTime: clients.startTime,
          endTime: clients.endTime,
          description: clients.description,
          status: clients.status,
          creatAt: clients.createdAt,

        });
        
      this.clientForm.get('name')?.disable();
      this.clientForm.get('email')?.disable();

      this.clientForm.get('password')?.clearValidators();
      this.clientForm.get('confirmPass')?.clearValidators();

      this.clientForm.get('password')?.updateValueAndValidity();
      this.clientForm.get('confirmPass')?.updateValueAndValidity();
      }
    );
  }




  goToExistClientList(): void {
    this.routes.navigateByUrl('app/clients-managment/clients/clientsExistList');
  }



}
