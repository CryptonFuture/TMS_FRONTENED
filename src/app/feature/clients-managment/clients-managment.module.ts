// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { ClientsManagmentComponent } from './clients-managment.component';
import { ClientsFormComponent } from './clients/clients-form/clients-form.component';
import { ClientsExistListComponent } from './clients/clients-exist-list/clients-exist-list.component';
import { ClientsNonexistListComponent } from './clients/clients-nonexist-list/clients-nonexist-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';




const routes :Routes=[

    {
        path:'',
        component:ClientsManagmentComponent,
        children :[
            {
                path:'clients',
                children:[
                    {
                        path:'clientsForm',
                        component:ClientsFormComponent,
                    },
                    {
                        path:'clientsExistList',
                        component:ClientsExistListComponent,
                    },
                    {
                        path:'clientsNonExistList',
                        component:ClientsNonexistListComponent
                    }
                ]
            }
        ]
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
        ClientsManagmentComponent,
        ClientsFormComponent,
        ClientsExistListComponent,
        ClientsNonexistListComponent,

    ],
    exports: [
        ClientsManagmentComponent,
    ]
})
export class ClientsManagmentModule {

}
