// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { LoginscreenComponent } from './loginscreen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [
          
            FormsModule,
            CommonModule,
            ReactiveFormsModule,
            BrowserAnimationsModule,
            MatCardModule,
            MatFormFieldModule,
            MatInputModule,
            MatCheckboxModule,
            MatButtonModule
        
           

    ],
    declarations: [
        LoginscreenComponent,
    ],
    exports: [
        LoginscreenComponent,
    ]
})
export class LoginscreenModule {

}
