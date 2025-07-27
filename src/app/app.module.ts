import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginscreenModule } from './feature/auth/loginscreen/loginscreen.module';
import { FeatureLayoutModule } from './layout/feature-layout/feature-layout.module';
import { DashboardModule } from './feature/dashboard/dashboard.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';



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
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,  
    MatCardModule
    
    
    
    

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
