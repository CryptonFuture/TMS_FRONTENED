// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { AssignEnployeeToClientComponent } from './assign-employee-to-client.component';
import { AssignEmployeeFormComponent } from './assign/assign-employee-form/assign-employee-form.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AssignAllocationComponent } from './assign/assign-allocation/assign-allocation.component';
import { AssignNonAllocationComponent } from './assign/assign-non-allocation/assign-non-allocation.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';

const routes: Routes = [
    {
        path: '',
        component: AssignEnployeeToClientComponent,
        children: [
            {
                path: 'assign',
                children: [
                    {
                        path: 'assignEmployeeForm',
                        component: AssignEmployeeFormComponent
                    },
                    {
                        path: 'assignAllocation',
                        component: AssignAllocationComponent
                    },
                    {
                        path: 'assignNonAllocation',
                        component: AssignNonAllocationComponent
                    }

                ],

            },


        ]




    },
    {
        path: '',
        redirectTo: 'app/dashboard',
        pathMatch: 'full',
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
        MatTabsModule,
        MatSortModule,

    ],
    declarations: [
        AssignEnployeeToClientComponent,

        AssignEmployeeFormComponent,
        AssignAllocationComponent,
        AssignNonAllocationComponent
    ],
    exports: [
        AssignEnployeeToClientComponent,
    ]
})
export class AssignEnployeeToClientModule {

}
