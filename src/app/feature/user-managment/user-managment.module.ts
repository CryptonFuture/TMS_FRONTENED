// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { UserManagmentComponent } from './user-managment.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeFormComponent } from './employee/employee-form/employee-form.component';
import { EmployeeListActiveComponent } from './employee/employee-list-active/employee-list-active.component';
import { EmployeeListUnactiveComponent } from './employee/employee-list-unactive/employee-list-unactive.component';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EditEmployeeFormComponent } from './employee/edit-employee-form/edit-employee-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';


const routes:Routes =[
    {
        path:'',
        component:UserManagmentComponent,
        children:[
            {
                path:'employee',
                children:[
                    {
                        
                        path:'employeeForm',
                        component:EmployeeFormComponent
                    },

                     {
                        
                        path:'edit-employee-form/:id',
                        component: EditEmployeeFormComponent
                    },
                    {
                        path:'employeeListActive',
                        component:EmployeeListActiveComponent
                    },
                    {
                        path:'employeeListUnactive',
                        component:EmployeeListUnactiveComponent
                    }
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
        MatChipsModule,
        MatDialogModule,
        MatSnackBarModule,
        MatGridListModule,
        MatDatepickerModule,
        MatCheckboxModule

    ],
    declarations: [
        UserManagmentComponent,
        EmployeeFormComponent,
        EmployeeListActiveComponent,
        EmployeeListUnactiveComponent,
        EditEmployeeFormComponent
    ],
    exports: [
        UserManagmentComponent,
    ]
})
export class UserManagmentModule {

}
