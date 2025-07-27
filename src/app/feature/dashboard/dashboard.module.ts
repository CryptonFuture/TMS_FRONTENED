// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { DashboardComponent } from './dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        MatCardModule,
        MatIconModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule



    ],
    declarations: [
        DashboardComponent,
    ],
    exports: [
        DashboardComponent,
    ]
})
export class DashboardModule {

}
