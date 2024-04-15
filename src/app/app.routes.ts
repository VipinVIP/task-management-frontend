import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';

export const routes: Routes = [
  { path:'',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path : 'dashboard', component:DashboardCardComponent}
];
