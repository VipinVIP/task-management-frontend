import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse, User } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}
  userSignUp(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('signup/', user);
  }
  userLogin(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('login/', user);
  }
}
