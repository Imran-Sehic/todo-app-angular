import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { User } from 'src/app/models/user-model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;
  dataLoaded: boolean = false;

  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(data => {
      this.user = data;
      this.dataLoaded = true;
    }, error => {
      throwError(error)
    });
  }

  goToAllTodos() {
    this.router.navigateByUrl('home');
  }

  showDropdown() {
    var x = document.getElementById("dropdown");
    if (x.style.display === "none") {
      x.style.display = "block"
    } else {
      x.style.display = "none"
    }
  }

  goToUserProfile() {
    this.router.navigateByUrl('profile');
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

}
