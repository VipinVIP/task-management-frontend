import { Component, OnInit } from '@angular/core';
import { DashboardCardComponent } from '../../components/dashboard-card/dashboard-card.component';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';

interface Task {
  id: number;
  title: string;
  description?: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: Date;
  progress: number;
  user_id: number;
}

const token = localStorage.getItem('access_token');

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule,DashboardCardComponent],
  providers:[TaskService],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})

export class DashboardPageComponent implements OnInit{
  tasks : Task[]=[];

  constructor(private taskService : TaskService) {}
  ngOnInit(): void {
    console.log('token',token)
    this.taskService.getTasks(token).subscribe((data: any) =>{
      this.tasks = data;
      console.log(data);
      console.log("asdfghjk",this.tasks);
    },(error: any) =>{
      console.log('Error fetching messages',error)
    });
  }



}
