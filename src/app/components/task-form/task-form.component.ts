import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent {

  fb=inject(FormBuilder)
  taskForm: FormGroup=this.fb.group({
    title: ['', Validators.required],
    description: [''],
    priority: ['', Validators.required],
    dueDate: ['', Validators.required],
    assignees: [[]] 
  })
  get f() {
    return this.taskForm.controls;
  }
  onSubmit() {
    if (this.taskForm.valid) {
      console.log(this.taskForm.value);
    } else {
      this.taskForm.markAllAsTouched();
    }
  }
  
}
