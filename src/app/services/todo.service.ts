import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoModel } from '../models/todo-model';
import { CreateTodoPayload } from '../components/home/create-todo.payload';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  insertTodo(todo: CreateTodoPayload): Observable<void> {
    return this.http.post<void>('http://localhost:8080/api/todo/', todo);
  }

  getAllTodosForUser(): Observable<Array<TodoModel>> {
    return this.http.get<Array<TodoModel>>('http://localhost:8080/api/todo/');
  }

  updateTodo(todo: TodoModel): Observable<void> {
    return this.http.put<void>('http://localhost:8080/api/todo/', todo);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>('http://localhost:8080/api/todo/' + id);
  }

}
