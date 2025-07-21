import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginscreenModule } from './feature/auth/loginscreen/loginscreen.module';
import { FeatureLayoutModule } from './layout/feature-layout/feature-layout.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
  BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    LoginscreenModule,
    AppRoutingModule,
    FeatureLayoutModule,
    RouterModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
