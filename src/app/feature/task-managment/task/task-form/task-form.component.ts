import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/core/services/task.services';
import { UserService } from 'src/app/core/services/user.services';
import { TaskFormInterface } from 'src/app/shared/interface/task.interface';
import { UserFormInterface } from 'src/app/shared/interface/user.interface';

@Component({
    // moduleId: module.id,
    selector: 'task-form',
    templateUrl: 'task-form.component.html',
    styleUrls: ['task-form.component.scss']
})
export class TaskFormComponent {

     taskForm!: FormGroup;
      editMode = false;
      editTaskId: string | null = null;
    
      constructor(
        private routes: Router,
        private taskServices: TaskService,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private userServices:UserService
        
      ) {}
    
      ngOnInit(): void {
        this.initialize();
    
        this.activatedRoute.queryParams.subscribe((params: any) => {
          if (params.id) {
            this.editMode = true;
            this.editTaskId = String(params['id']);
            this.loadTaskForEdit(this.editTaskId);
          }
        });
      }
    
      initialize(): void {
        this.taskForm = this.fb.group({
          _id: [''],
          name:['',Validators.required],
          description: [''],
          accsessToken: [''],
          refreshToken: [''],
          status: ['Active'],
          is_deleted: [false],
          createdAt: [''],
          updatedAt: ['']
        })
      }
    
    
      onSubmit(): void {
        debugger
        if (this.taskForm.invalid) {
          console.log('Form is invalid');
          this.taskForm.markAllAsTouched();
          return;
        }
    
        const formData = this.taskForm.value
    
    
        const payload: TaskFormInterface = {
      _id: formData._id,
      name:formData.name,
      description: formData.description,
      accsessToken: formData.accsessToken,
      refreshToken: formData.refreshToken,
      status: formData.status,
      is_deleted: formData.is_deleted,
      createdAt: formData.createdAt,
      updatedAt: formData.updatedAt
    };
    
    
        if (this.editMode) {
        const TaskId = String (this.editTaskId);
    
          this.taskServices.editTaskData(TaskId, payload).subscribe({
            next: (response: any) => {
              console.log('Task updated Successfully', response);
    
              this.taskForm.reset();
              this.routes.navigateByUrl('app/task-managment/task/taskList');
            },
            error: (error: any) => {
              console.log('Error updating Task:', error);
            }
          });
        } else {
          this.taskServices.addTaskData(payload).subscribe(
            (response: any) => {
              console.log('Task added successfully', response);
              this.taskForm.reset();
                  this.routes.navigateByUrl('app/task-managment/task/taskList');
    
            },
             (error: any) => {
              console.log('Error adding Task:', error);
            
          });
        }
      }
    
      loadTaskForEdit(TaskId: string): void {
      this.taskServices.getTaskById(TaskId).subscribe(
        (Task   ) => {
    
          this.taskForm.patchValue({
            _id: Task._id,
            name:Task.name,
            description: Task.description,
            status:Task.status,
            
          });
        }
      );
    }

     
    
    
      
    
      goToTaskList(): void {
        this.routes.navigateByUrl('app/task-managment/task/taskList');
      }
    



}
