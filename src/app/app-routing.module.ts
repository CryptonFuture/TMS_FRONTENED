import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginscreenComponent } from './feature/auth/loginscreen/loginscreen.component';
import { FeatureLayoutComponent } from './layout/feature-layout/feature-layout.component';

const routes: Routes = [


       {
        path:'feature/layout',
        component:FeatureLayoutComponent
       },

       {
        path:'feature/login',
        component:LoginscreenComponent
       },
       {
          path :'',
          redirectTo:'feature/login',
          pathMatch: 'full',
         },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
