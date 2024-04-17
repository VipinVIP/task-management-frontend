import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}
  addTask(task: {
    title: string;
    description: string;
    priority: string;
    dueDate: string;
  }): Observable<any> {
    return this.http.post<any>('add-task/', task);
  }

  updateTask(
    id: number,
    task: {
      title: string;
      description: string;
      priority: string;
      dueDate: string;
      progress: string;
    }
  ): Observable<any> {
    return this.http.post<any>(`tasks/${id}`, task);
  }

  deleteTask(id: string) {
    return this.http.patch<any>(`tasks/${id}`, {});
  }
}
