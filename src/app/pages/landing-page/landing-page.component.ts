import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';
import { DashboardPageComponent } from '../dashboard-page/dashboard-page.component';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { FormSubmissionResponse } from '../../types';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, LoginComponent, DashboardPageComponent],
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent {
  isLoggedIn() {
    return localStorage.getItem('access_token') !== null;
  }
}
