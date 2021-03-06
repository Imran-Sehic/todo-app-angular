import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToAllTodos(){
    this.router.navigateByUrl('home');
  }

  goToActiveTodos(){
    this.router.navigateByUrl('active-todos');
  }

  goToCompletedTodos(){
    this.router.navigateByUrl('completed-todos');
  }

  goToRemovedTodos(){
    this.router.navigateByUrl('removed-todos');
  }

  goToStatistics(){
    this.router.navigateByUrl('statistics');
  }

}
