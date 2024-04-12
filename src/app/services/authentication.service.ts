import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private http:HttpClient) { }
  userSignUp(user:{userName : string;email : string;password : string;}):  Observable<{token:string;success:boolean;refreshToken:string}>{
    return this.http.post<{token:string;success:boolean;refreshToken:string}>(baseUrl+'signup/',user)
  }
    userLogin(user:{email : string;password : string}):  Observable<{token:string;success:boolean;refreshToken:string}>{
      return this.http.post<{token:string;success:boolean;refreshToken:string}>(baseUrl+'login/',user)
    }
}
