import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';
import { DashboardPageComponent } from '../dashboard-page/dashboard-page.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule,LoginComponent,DashboardPageComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
isLoggedIn(){
  return localStorage.getItem('access_token')!==null
}
}
