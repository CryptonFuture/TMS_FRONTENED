// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { TaskManagmentComponent } from './task-managment.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TaskFormComponent } from './task/task-form/task-form.component';
import { TaskListComponent } from './task/task-list/task-list.component';

const routes:Routes =[
    {
        path:'',
        component:TaskManagmentComponent,
        children:[
            {
                path:'task',
                children:[
                    {
                        path:'taskForm',
                        component:TaskFormComponent
                    },
                    {
                        path:'taskList',
                        component:TaskListComponent
                    },
                    
                ],
                
            },


        ]
        



    },
    {
    path:'',
    redirectTo:'app/dashboard',
    pathMatch:'full',
   }





]


@NgModule({
    imports: [
                RouterModule.forChild(routes),
                FormsModule,
                CommonModule,
                ReactiveFormsModule,
                MatTableModule,
                MatMenuModule,
                MatButtonModule,
                MatIconModule,
                MatCardModule,
                MatFormFieldModule,
                MatInputModule,
                MatSelectModule,
                MatPaginatorModule,

    ],
    declarations: [
        TaskManagmentComponent,
        TaskFormComponent,
        TaskListComponent
    ],
    exports: [
        TaskManagmentComponent,
    ]
})
export class TaskManagmentModule {

}
