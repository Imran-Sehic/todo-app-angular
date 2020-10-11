import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-active-todos',
  templateUrl: './active-todos.component.html',
  styleUrls: ['./active-todos.component.css']
})
export class ActiveTodosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showSidebar(){
    document.getElementById('sidebar-mobile').classList.toggle('active');
  }

}
