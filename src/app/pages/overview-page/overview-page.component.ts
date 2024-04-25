import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { CompactCardComponent } from '../../components/compact-card/compact-card.component';
import { Task } from '../../types';

@Component({
  selector: 'app-overview-page',
  standalone: true,
  imports: [CommonModule, CompactCardComponent],
  providers: [TaskService],
  templateUrl: './overview-page.component.html',
})
export class OverviewPageComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  tasks: Task[] = [];
  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (data: Task[]) => {
        this.tasks = data;
        console.log(this.tasks);
      },
      error: (error: object) => {
        console.log('Error fetching messages', error);
      },
    });
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  drop(event: DragEvent, containerId: string) {
    event.preventDefault();
    const data = event.dataTransfer?.getData('text');
    const task = this.tasks.filter((item) => item.id == data)[0];
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
