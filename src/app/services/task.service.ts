import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../types';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>('add-task/', task);
  }
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('tasks/');
  }

  updateTask(id: string | undefined, task: Task): Observable<object> {
    return this.http.put<object>(`tasks/${id}`, task);
  }

  deleteTask(id: string) {
    return this.http.patch<object>(`tasks/${id}`, {});
  }
}
