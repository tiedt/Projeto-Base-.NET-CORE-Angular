import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteEditComponent } from './clientes/cliente-edit/cliente-edit.component';


const routes: Routes = [
  {path: 'user', component: UserComponent,
   children:[
    {path: 'login', component: LoginComponent},
    {path: 'registration', component: RegistrationComponent},
   ]},

  {path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard]},
  {path: 'cliente/:id/edit', component: ClienteEditComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
