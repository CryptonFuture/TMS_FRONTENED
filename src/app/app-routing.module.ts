import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginscreenComponent } from './feature/auth/loginscreen/loginscreen.component';

const routes: Routes = [


  {
        path:'login',
        component:LoginscreenComponent
       },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
