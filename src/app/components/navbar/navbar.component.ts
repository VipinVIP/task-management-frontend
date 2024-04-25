import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  isDark: boolean = false;
  @Input() isLoggedIn: boolean = false;

  ngOnInit() {
    const storedValue = localStorage.getItem('isDark');
    this.isDark = storedValue ? storedValue === 'true' : false;
    this.applyTheme();
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    localStorage.setItem('isDark', this.isDark.toString());
    this.applyTheme();
  }

  private applyTheme() {
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      htmlElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
    }
  }
}
