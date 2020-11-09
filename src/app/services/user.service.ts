import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateProfile } from '../components/profile/update-profile.payload';
import { User } from '../models/user-model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  refreshTokenPayload = {
    refreshToken: this.authService.getRefreshToken(),
    username: this.authService.getUserName()
  }

  constructor(private http: HttpClient, private authService: AuthService) { }

  getCurrentUser() :Observable<User> {
    return this.http.get<User>('http://localhost:8080/api/user/');
  }

  updateProfile(updateProfilePayload: UpdateProfile) :Observable<boolean> {
    return this.http.put<boolean>('http://localhost:8080/api/user/', [updateProfilePayload, this.refreshTokenPayload]);
  }

  deleteProfile() {
    this.http.delete('http://localhost:8080/api/user/');
    return this.authService.logout();
  }
  
}
