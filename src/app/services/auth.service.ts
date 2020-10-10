import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginUserPayload } from '../components/login/login-user.payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginUserPayload: LoginUserPayload) {
    return this.http.post('http://localhost:8080/api/login/', loginUserPayload);
  }
}
