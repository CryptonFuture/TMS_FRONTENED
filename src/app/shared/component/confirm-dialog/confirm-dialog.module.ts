// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
    imports: [
        MatButtonModule,
        MatDialogModule
        


    ],
    declarations: [
        ConfirmDialogComponent,
    ],
    exports: [
        ConfirmDialogComponent,
    ]
})
export class ConfirmDialogModule {

}
