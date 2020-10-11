import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToAllTodos(){
    this.router.navigateByUrl('home');
  }

  showDropdown(){
    var x = document.getElementById("dropdown");
    if(x.style.display === "none"){
      x.style.display = "block"
    }else{
      x.style.display = "none"
    }
  }

  goToUserProfile(){

  }

  goToSettings(){

  }

  logout(){
    
  }

}
