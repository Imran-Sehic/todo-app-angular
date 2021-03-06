import { Component, OnInit } from '@angular/core';
import { TodoModel } from 'src/app/models/todo-model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-active-todos',
  templateUrl: './active-todos.component.html',
  styleUrls: ['./active-todos.component.css']
})
export class ActiveTodosComponent implements OnInit {

  todos: TodoModel[];
  areThereTodos: string = "loading";

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getAllTodosForUser().subscribe(data => {
      this.todos = data.filter(todo => todo.checked === false && todo.deleted === false);
      if(this.todos.length > 0){
        this.areThereTodos = "yes";
      }else{
        this.areThereTodos = "no";
      }
    })
  }

  showSidebar(){
    document.getElementById('sidebar').classList.toggle('active');
  }

}
