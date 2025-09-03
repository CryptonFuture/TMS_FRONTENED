import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginscreenModule } from './feature/auth/loginscreen/loginscreen.module';
import { FeatureLayoutModule } from './layout/feature-layout/feature-layout.module';
import { DashboardModule } from './feature/dashboard/dashboard.module';
import { HttpClientModule } from '@angular/common/http';
import {  MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogModule } from './shared/component/confirm-dialog/confirm-dialog.module';



@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
  BrowserModule,
    LoginscreenModule,
    AppRoutingModule,
    FeatureLayoutModule,
    DashboardModule,
    HttpClientModule,
    ConfirmDialogModule
    

    
    
    
    

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
