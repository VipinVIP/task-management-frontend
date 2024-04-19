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
  originalTasks: Task[] = [];
  searchItems(searchTerm: string) {
    if (!searchTerm) {
      this.originalTasks = [...this.filteredTasks];
    } else {
      this.originalTasks = this.filteredTasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  filterItems(progress: string) {
    switch (progress) {
      case 'all':
        this.filteredTasks = this.tasks;
        break;
      case 'not-started':
        this.filteredTasks = this.tasks.filter((task) => task.progress === 0);
        break;
      case 'in-progress':
        this.filteredTasks = this.tasks.filter(
          (task) => task.progress > 0 && task.progress < 100
        );
        break;
      case 'done':
        this.filteredTasks = this.tasks.filter((task) => task.progress === 100);
        break;
    }
    this.searchItems('');
  }
  dataToEdit: Task | null = null;
  showUpdateForm(taskData: any) {
    console.log(taskData);
    this.dataToEdit = taskData;
  }
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  taskId: string = '';
  showModal: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    console.log('token', token);
    this.taskService.getTasks(token).subscribe({
      next: (data: any) => {
        this.tasks = data;
        this.originalTasks = data;
        this.filteredTasks = data;
      },
      error: (error: any) => {
        console.log('Error fetching messages', error);
      },
    });
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
    this.openModal();
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
        this.originalTasks = data;
        this.showModal = false;
        this.actionSuccess = true;
        this.actionMessage = 'Task successfully deleted';
        setTimeout(() => {
          this.actionSuccess = false;
        }, 2000);
      });
    }
  }
}
