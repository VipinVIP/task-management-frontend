import { Component, Input } from '@angular/core';
import { Task } from '../../types';
@Component({
  selector: 'app-compact-card',
  standalone: true,
  imports: [],
  templateUrl: './compact-card.component.html',
  styleUrl: './compact-card.component.css',
})
export class CompactCardComponent {
  @Input() task: Task | null = null;

  drag(event: DragEvent) {
    const card = event.target as HTMLDivElement;
    event.dataTransfer?.setData('text', card?.id);
  }
}
