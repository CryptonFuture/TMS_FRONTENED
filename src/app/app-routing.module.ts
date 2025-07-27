import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginscreenComponent } from './feature/auth/loginscreen/loginscreen.component';
import { FeatureLayoutComponent } from './layout/feature-layout/feature-layout.component';
import { DashboardComponent } from './feature/dashboard/dashboard.component';

const routes: Routes = [

    {
    path:'',
    component:FeatureLayoutComponent,
    children:[
      {
        path:'dashboard',
        component:DashboardComponent
      },
      

    ]
  },
       




       {
        path:'feature/login',
        component:LoginscreenComponent
       },
       {
          path :'',
          redirectTo:'dashboard',
          pathMatch: 'full',
         },
         {
          path: '**',
          component: FeatureLayoutComponent
         },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
