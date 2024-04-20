import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NavbarComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  isLoggedIn() {
    return localStorage.getItem('access_token') !== null;
  }
  logout() {
    localStorage.removeItem('access_token');
  }
}
