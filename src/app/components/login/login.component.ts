import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { LoginRequest } from './login-request.payload';
import { RegisterUserPayload } from './register-user.payload';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRequestPayload: LoginRequest;
  registerUserPayload: RegisterUserPayload;
  loginUserForm: FormGroup;
  registerUserForm: FormGroup;
  loggedIn: string;
  registered: string;

  constructor(private authService: AuthService, private router: Router) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    }

    this.registerUserPayload = {
      firstname: '',
      lastname: '',
      username: '',
      password: ''
    }
  }

  ngOnInit(): void {
    this.loginUserForm = new FormGroup({
      usernameLogin: new FormControl('', Validators.required),
      passwordLogin: new FormControl('', Validators.required)
    });

    this.registerUserForm = new FormGroup({
      firstnameRegister: new FormControl('', Validators.required),
      lastnameRegister: new FormControl('', Validators.required),
      usernameRegister: new FormControl('', Validators.required),
      passwordRegister: new FormControl('', Validators.required)
    });
  }

  login() {
    this.loginRequestPayload.username = this.loginUserForm.get('usernameLogin').value;
    this.loginRequestPayload.password = this.loginUserForm.get('passwordLogin').value;

    if (this.loginUserForm.get('usernameLogin').valid && this.loginUserForm.get('passwordLogin').valid) {

      this.authService.login(this.loginRequestPayload).subscribe(data => {
        if (data) {
          this.loggedIn = "yes";
          this.router.navigateByUrl('');
        } else {
          this.loggedIn = "denied"
        }
      }, error => {
        throwError(error);
      });

    } else {
      this.loggedIn = "no";
    }
  }

  register() {
    this.registerUserPayload.firstname = this.registerUserForm.get('firstnameRegister').value;
    this.registerUserPayload.lastname = this.registerUserForm.get('lastnameRegister').value;
    this.registerUserPayload.username = this.registerUserForm.get('usernameRegister').value;
    this.registerUserPayload.password = this.registerUserForm.get('passwordRegister').value;

    if (this.registerUserForm.get('usernameRegister').valid && this.registerUserForm.get('passwordRegister').valid
      && this.registerUserForm.get('firstnameRegister').valid && this.registerUserForm.get('lastnameRegister').valid) {

      this.authService.register(this.registerUserPayload).subscribe(registered => {
        if (registered) {
          this.registered = "yes";
        } else {
          this.registered = "usernameTaken";
        }
      }, error => {
        throwError(error);
      });

    } else {
      this.registered = "no";
    }
  }

  goToRegister() {
    document.getElementById('authContainer').classList.toggle('rotate');
  }

  goToLogin() {
    document.getElementById('authContainer').classList.toggle('rotate');
  }

}
