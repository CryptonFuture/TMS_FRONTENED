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
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { AuthService } from 'src/app/core/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select'


@NgModule({
    imports: [
          
            FormsModule,
            ReactiveFormsModule,
            BrowserAnimationsModule,
            MatCardModule,
            MatFormFieldModule,
            MatInputModule,
            MatCheckboxModule,
            MatButtonModule,
            MatSnackBarModule,
            HttpClientModule,
            MatSelectModule

    ],
    declarations: [
        LoginscreenComponent,
    ],
    exports: [
        LoginscreenComponent,
    ],
    providers: [
       
    ]
})
export class LoginscreenModule {

}
