import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { LoginUserPayload } from './login-user.payload';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserPayload: LoginUserPayload;
  loginUserForm: FormGroup;
  registerUserForm: FormGroup;
  loggedIn: string;

  constructor(private authService: AuthService, private router: Router) { 
    this.loginUserPayload = {
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

  login(){
    this.loginUserPayload.username = this.loginUserForm.get('usernameLogin').value;
    this.loginUserPayload.password = this.loginUserForm.get('passwordRegister').value;

    if (this.loginUserForm.get('usernameLogin').valid && this.loginUserForm.get('passwordLogin').valid) {

      this.authService.login(this.loginUserPayload).subscribe(() => {
        this.loggedIn = "yes";
        this.router.navigateByUrl('');
      }, error => {
        throwError(error);
      });

    }else{
      this.loggedIn = "no";
    }
  }

  register(){

  }

  goToRegister(){
    document.getElementById('authContainer').style.transform = "rotateY(180deg)";
  }

  goToLogin(){
    document.getElementById('authContainer').style.removeProperty('transform');
  }

}
