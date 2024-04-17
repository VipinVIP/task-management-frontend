import { Component, OnInit } from '@angular/core';
import { DashboardCardComponent } from '../../components/dashboard-card/dashboard-card.component';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { FormSubmissionResponse } from '../../types';
import { TaskFormComponent } from '../../components/task-form/task-form.component';

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
  imports: [CommonModule, DashboardCardComponent, TaskFormComponent],
})
export class DashboardPageComponent implements OnInit {
  dataToEdit: Task | null = null;
  showUpdateForm(taskData: any) {
    console.log(taskData);
    this.dataToEdit = taskData;
  }
  tasks: Task[] = [];
  taskId: string = '';
  showModal: boolean = false;

  constructor(private taskService: TaskService) {}
  ngOnInit(): void {
    console.log('token', token);
    this.taskService.getTasks(token).subscribe(
      (data: any) => {
        this.tasks = data;
        console.log(data);
        console.log('asdfghjk', this.tasks);
      },
      (error: any) => {
        console.log('Error fetching messages', error);
      }
    );
  }

  actionSuccess = false;
  actionFailure = false;
  actionMessage = '';
  onStatusChange(status: FormSubmissionResponse) {
    this.actionMessage = status.message;
    if (status.status == 'success') {
      this.actionSuccess = true;
      this.ngOnInit();
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

  openModal() {
    this.showModal = true;
    console.log(this.showModal);
  }

  closeModal() {
    this.showModal = false;
    console.log(this.showModal);
  }

  handleOutputData(id: string | null) {
    if (id !== null) {
      console.log('Task ID:', id);
      this.taskId = id;
    }
  }

  deleteCard(id: string | null) {
    if (id !== null) {
      this.taskService.deleteTask(id).subscribe((res) => {
        const data = this.tasks.filter((item) => {
          return item.id !== parseInt(this.taskId);
        });
        this.tasks = data;
        this.showModal = false;
      });
    }
  }
}
