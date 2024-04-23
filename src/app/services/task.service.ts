import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  description?: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
  progress: number;
  user_id: number;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}
  addTask(task: {
    title: string;
    description?: string;
    priority: string;
    dueDate: string;
  }): Observable<any> {
    return this.http.post<any>('add-task/', task);
  }
  getTasks(): Observable<Task> {
    return this.http.get<Task>('tasks/');
  }

  updateTask(
    id: number,
    task: {
      title: string;
      description?: string;
      priority: string;
      dueDate: string | Date;
      progress: string | number;
    }
  ): Observable<any> {
    return this.http.put<any>(`tasks/${id}`, task);
  }

  deleteTask(id: string) {
    return this.http.patch<any>(`tasks/${id}`, {});
  }
}
