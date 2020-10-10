import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  goToHome(){}

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
