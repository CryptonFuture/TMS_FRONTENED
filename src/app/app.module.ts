import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginscreenModule } from './feature/auth/loginscreen/loginscreen.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
  BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    LoginscreenModule,
    AppRoutingModule,

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
