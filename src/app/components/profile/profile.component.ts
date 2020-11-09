import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { UpdateProfile } from './update-profile.payload';
import { UserService } from '../../services/user.service';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user-model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id: number;
  updateProfileForm: FormGroup;
  updateProfilePayload: UpdateProfile;
  updating: string;

  constructor(private userService:UserService, private router: Router) {
    this.updateProfilePayload = {
      firstname: '',
      lastname: '',
      oldPassword: '',
      newPassword: ''
    }
  }

  ngOnInit(): void {
    this.updateProfileForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
    });

    this.userService.getCurrentUser().subscribe(user => {
      this.updateProfileForm.patchValue({
        firstname: user.firstname,
        lastname: user.lastname
      });
    }, error => {
      throwError(error);
    })
  }

  updateProfile() {
    this.updateProfilePayload.firstname = this.updateProfileForm.get('firstname').value;
    this.updateProfilePayload.lastname = this.updateProfileForm.get('lastname').value;
    this.updateProfilePayload.oldPassword = this.updateProfileForm.get('oldPassword').value;
    this.updateProfilePayload.newPassword = this.updateProfileForm.get('newPassword').value;

    if (this.updateProfileForm.get('firstname').valid && this.updateProfileForm.get('lastname').valid
      && this.updateProfileForm.get('oldPassword').valid && this.updateProfileForm.get('newPassword')) {

      this.updating = "updating";

      this.userService.updateProfile(this.updateProfilePayload).subscribe(data => {
        if(data){
          this.router.navigateByUrl('login');
        }else{
          this.updating = "wrongPassword";
        }
      }, error => {
        throwError(error);
      });

    } else {
      this.updating = "no";
    }
  }

  deleteProfile() {
    this.userService.deleteProfile();
    this.router.navigateByUrl('login');
  }

  showSidebar(){
    document.getElementById('sidebar').classList.toggle('active');
  }

}
