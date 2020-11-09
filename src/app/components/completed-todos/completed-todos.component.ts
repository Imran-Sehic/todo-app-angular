import { Component, OnInit } from '@angular/core';
import { TodoModel } from 'src/app/models/todo-model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-completed-todos',
  templateUrl: './completed-todos.component.html',
  styleUrls: ['./completed-todos.component.css']
})
export class CompletedTodosComponent implements OnInit {

  todos: TodoModel[];
  areThereTodos: string = "loading";

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getAllTodosForUser().subscribe(data => {
      this.todos = data.filter(todo => todo.checked === true && todo.deleted === false);
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
