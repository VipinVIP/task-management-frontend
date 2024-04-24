import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [CommonModule],
  providers: [TaskService],
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.css',
})
export class DashboardCardComponent implements OnInit {
  @Input() inputData: Task | null = null;
  @Output() outputDataId: EventEmitter<string | null> = new EventEmitter<
    string | null
  >();
  @Output() outputData = new EventEmitter();
  currentDate = new Date();
  due: Date | undefined;
  differenceInMillis: number | undefined;
  daysRemaining: number | undefined;
  isdarkMode: boolean = false;
  value: number = 0;

  ngOnInit() {
    if (this.inputData) {
      if (typeof this.inputData.dueDate === 'string') {
        try {
          this.due = new Date(this.inputData.dueDate);
        } catch (error) {
          console.warn('Invalid date format in dueDate:', error);
        }
      } else if (this.inputData.dueDate instanceof Date) {
        this.due = this.inputData.dueDate;
      } else {
        console.warn(
          'dueDate is not a valid Date or string:',
          this.inputData.dueDate
        );
      }
      if (this.due instanceof Date) {
        this.differenceInMillis =
          this.due.getTime() - this.currentDate.getTime();
        this.daysRemaining = Math.ceil(
          this.differenceInMillis / (1000 * 3600 * 24)
        );
      }
    }
    console.log(this.daysRemaining);
    this.getAbsoluteValue();
  }

  getAbsoluteValue() {
    if (this.daysRemaining !== undefined) {
      this.value = Math.abs(this.daysRemaining);
    }
    return this.value;
  }

  openModal() {
    // this.showModal.emit();
    if (this.inputData) {
      this.outputDataId.emit(this.inputData.id.toString());
    }
  }

  showUpdatePopup() {
    this.outputData.emit(this.inputData);
  }
}
