import { Component, OnInit } from '@angular/core';
import { DashboardCardComponent } from '../../components/dashboard-card/dashboard-card.component';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { FormSubmissionResponse } from '../../types';
import { TaskFormComponent } from "../../components/task-form/task-form.component";

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
    providers: [TaskService],
    templateUrl: './dashboard-page.component.html',
    styleUrl: './dashboard-page.component.css',
    imports: [CommonModule, DashboardCardComponent, TaskFormComponent]
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
