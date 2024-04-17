import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';
import { DashboardPageComponent } from '../dashboard-page/dashboard-page.component';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { FormSubmissionResponse } from '../../types';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule,LoginComponent,DashboardPageComponent],
  imports: [CommonModule, LoginComponent, TaskFormComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  isLoggedIn() {
    return localStorage.getItem('access_token') !== null;
  }
  actionSuccess = false;
  actionFailure = false;
  onStatusChange(status: FormSubmissionResponse) {
    console.log('from child to parent', status);
    if (status.status == 'success') {
      this.actionSuccess = true;
      setTimeout(() => {
        this.actionSuccess = false;
      }, 3000);
    }
    if (status.status == 'failure') {
      this.actionFailure = true;
      setTimeout(() => {
        this.actionFailure = false;
      }, 3000);
    }
  }
}
