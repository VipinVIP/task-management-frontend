import { Component } from '@angular/core';
import { Task, TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-overview-page',
  standalone: true,
  imports: [CommonModule],
  providers: [TaskService],
  templateUrl: './overview-page.component.html',
  styleUrl: './overview-page.component.css',
})
export class OverviewPageComponent {
  constructor(private taskService: TaskService) {}

  tasks: Task[] = [];
  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (data: any) => {
        this.tasks = data;
        console.log(this.tasks);
      },
      error: (error: any) => {
        console.log('Error fetching messages', error);
      },
    });
  }

  allowDrop(event: any) {
    event.preventDefault();
  }

  drag(event: any) {
    event.dataTransfer.setData('text', event.target.id);
  }

  drop(event: any, containerId: string) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    let task = this.tasks.filter((item) => item.id == data)[0];
    task.dueDate = task.dueDate.split('T')[0];

    switch (containerId) {
      case 'not-started':
        task.progress = 0;
        break;
      case 'in-progress':
        task.progress = 25;
        break;
      case 'done':
        task.progress = 100;
        break;
    }
    event.target.appendChild(document.getElementById(data));
    this.taskService.updateTask(data, task).subscribe({
      next: (resp) => {
        console.log(resp);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
