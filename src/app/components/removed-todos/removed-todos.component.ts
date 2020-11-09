import { Component, OnInit } from '@angular/core';
import { TodoModel } from 'src/app/models/todo-model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-removed-todos',
  templateUrl: './removed-todos.component.html',
  styleUrls: ['./removed-todos.component.css']
})
export class RemovedTodosComponent implements OnInit {

  todos: TodoModel[];
  areThereTodos: string = "loading";

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getAllTodosForUser().subscribe(data => {
      this.todos = data.filter(todo => todo.deleted === true);
      if(this.todos.length > 0){
        this.areThereTodos = "yes";
      }else{
        this.areThereTodos = "no"
      }
    })
  }

  unremoveTodo(todo: TodoModel) {
    this.todos = this.todos.filter(data => data.id !== todo.id);
    todo.deleted = false;

    if(this.todos.length === 0){
      this.areThereTodos = "no"
    }

    this.todoService.updateTodo(todo).subscribe(() => {

    })
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(data => data.id !== id);

    if(this.todos.length === 0){
      this.areThereTodos = "no"
    }

    this.todoService.deleteTodo(id).subscribe(() => {
      
    })
  }

  showSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
  }

}
