import { Component, Input } from '@angular/core';
import { Task } from '../../services/task.service';

@Component({
  selector: 'app-compact-card',
  standalone: true,
  imports: [],
  templateUrl: './compact-card.component.html',
  styleUrl: './compact-card.component.css',
})
export class CompactCardComponent {
  @Input() task: Task | null = null;

  drag(event: any) {
    event.dataTransfer.setData('text', event.target.id);
  }
}
