import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { FormSubmissionResponse } from '../../types';
import { dateNotLessThanCurrent } from '../../validators/dateValidators';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [TaskService],
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent {
  @Input() formAction: string = 'create';
  @Output() status = new EventEmitter<FormSubmissionResponse>();
  fb = inject(FormBuilder);
  taskService = inject(TaskService);
  taskForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    description: [''],
    progress: [0, [Validators.min(0), Validators.max(100)]],
    priority: ['', Validators.required],
    dueDate: ['', [Validators.required, dateNotLessThanCurrent()]],
  });
  get f() {
    return this.taskForm.controls;
  }
  onSubmit() {
    if (this.taskForm.valid) {
      const task = this.taskForm.value;
      this.taskService.addTask(task).subscribe({
        next: (resp) => {
          console.log(resp);
          this.taskForm.reset();
          this.status.emit({
            status: 'success',
            message: 'Task Addes successfully',
          });
        },
        error: (error) => {
          console.error(error);
          this.status.emit({ status: 'failure', message: error });
        },
      });
      console.log(task);
    } else {
      this.taskForm.markAllAsTouched();
    }
  }
}
