import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DashboardPageComponent } from '../dashboard-page/dashboard-page.component';
import { HomepageComponent } from '../homepage/homepage.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, DashboardPageComponent, HomepageComponent],
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent {
  isLoggedIn() {
    return localStorage.getItem('access_token') !== null;
  }
}
