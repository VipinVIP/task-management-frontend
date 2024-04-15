import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [TaskService],
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent {
  fb = inject(FormBuilder);
  taskService = inject(TaskService);
  taskForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    priority: ['', Validators.required],
    dueDate: ['', Validators.required],
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
        },
        error: (error) => {
          console.error(error);
        },
      });
      console.log(task);
    } else {
      this.taskForm.markAllAsTouched();
    }
  }
}
