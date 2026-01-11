import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginscreenComponent } from './feature/auth/loginscreen/loginscreen.component';
import { FeatureLayoutComponent } from './layout/feature-layout/feature-layout.component';
import { DashboardComponent } from './feature/dashboard/dashboard.component';
import { AuthGuard } from './core/guard/auth-guard';

const routes: Routes = [

    {
    path:'app',
    component:FeatureLayoutComponent,
    children:[
      {
        path:'dashboard',
        canActivate: [AuthGuard],
        component:DashboardComponent
      },
      {
        path:'user-managment',
        canActivate: [AuthGuard],
        loadChildren:()=> import('./feature/user-managment/user-managment.module').then(m => m.UserManagmentModule)

      },
      {
        path:'assign-employee-to-client',
        canActivate: [AuthGuard],
        loadChildren:()=> import('./feature/assign-employee-to-client/assign-enployee-to-client.module').then(m => m.AssignEnployeeToClientModule)
      },
      {
        path:'task-managment',
        canActivate: [AuthGuard],
        loadChildren:()=> import('./feature/task-managment/task-managment.module').then(m => m.TaskManagmentModule)
      },
      {
        path:'clients-managment',
        canActivate:[AuthGuard],
        loadChildren:() => import('./feature/clients-managment/clients-managment.module').then(m => m.ClientsManagmentModule )
      }
      

      

    ]
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
         {
          path: '**',
          component: LoginscreenComponent
         },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
