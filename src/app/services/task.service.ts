import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }
  addTask(task:{title : string;description : string;priority : string;dueDate:string}):  Observable<{token:string;auth:boolean;status:string}>{
    return this.http.post<{token:string;auth:boolean;status:string}>('add-task/',task)
  }}
