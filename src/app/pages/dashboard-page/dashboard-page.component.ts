import { Component } from '@angular/core';
import { DashboardCardComponent } from '../../components/dashboard-card/dashboard-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule,DashboardCardComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {

}
