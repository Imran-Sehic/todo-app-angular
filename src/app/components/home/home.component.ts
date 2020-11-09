import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoModel } from '../../models/todo-model';
import { TodoService } from '../../services/todo.service';
import { CreateTodoPayload } from './create-todo.payload';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todos: TodoModel[] = [];
  todoModel: TodoModel;
  areThereTodos: string = "loading";
  createTodoForm: FormGroup;
  createTodoPayload: CreateTodoPayload;

  constructor(private todoService: TodoService) {
    this.createTodoPayload = {
      content: ''
    }

    this.todoModel = {
      id: null,
      content: '',
      checked: false,
      deleted: false
    }
  }

  ngOnInit(): void {
    this.createTodoForm = new FormGroup({
      todoContent: new FormControl('', Validators.required)
    });

    this.todoService.getAllTodosForUser().subscribe(data => {
      this.todos = data.filter(todo => todo.deleted === false);
      if (this.todos.length > 0) {
        this.areThereTodos = "yes"
      } else {
        this.areThereTodos = "no";
      }
    })
  }

  createTodo() {
    this.createTodoPayload.content = this.createTodoForm.get('todoContent').value;
    if (this.createTodoForm.get('todoContent').valid) {

      this.createTodoForm.get('todoContent').setValue('');

      if (this.todos.length > 0) {
        this.areThereTodos = "yes"
      }

      this.todoService.insertTodo(this.createTodoPayload).subscribe(() => {
        this.todoService.getAllTodosForUser().subscribe(data => {
          this.todos = data.filter(todo => todo.deleted === false);
        })
      })

    }
  }

  checkTodo(todo: TodoModel) {
    if (todo.checked) {
      todo.checked = false;
    } else {
      todo.checked = true;
    }

    this.todoService.updateTodo(todo).subscribe(() => {

    })
  }

  removeTodo(todo: TodoModel) {
    todo.deleted = true;

    this.todos = this.todos.filter(data => data !== todo);
    if (this.todos.length === 0) {
      this.areThereTodos = "no"
    }

    this.todoService.updateTodo(todo).subscribe(() => {
    })
  }

  showSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
  }

}
