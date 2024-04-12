import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private http:HttpClient) { }
  userSignUp(user:{username : string;email : string;password : string;}):  Observable<{token:string;auth:boolean;status:string}>{
    return this.http.post<{token:string;auth:boolean;status:string}>(baseUrl+'signup/',user)
  }
    userLogin(user:{email : string;password : string}):  Observable<{token:string;auth:boolean;status:string}>{
      return this.http.post<{token:string;auth:boolean;status:string}>(baseUrl+'login/',user)
    }
}
