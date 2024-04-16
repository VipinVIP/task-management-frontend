import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Task {
  id: number;
  title: string;
  description?: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: Date;
  progress: number;
  user_id: number;
}

@Injectable({
  providedIn: 'root'
})


export class TaskService {

  constructor(private http:HttpClient) { }
  addTask(task:{title : string;description : string;priority : string;dueDate:string}):  Observable<{token:string;auth:boolean;status:string}>{
    return this.http.post<{token:string;auth:boolean;status:string}>('add-task/',task)
  }

  getTask(token:string):Observable<Task[]>{
    return this.http.get<Task[]>('/tasks'+ token)
  }}
