import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ITodo } from "../components/todo-item/todo-item.interfaces";

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getTodos(): Observable<ITodo[]> {
    return this.httpClient.get<ITodo[]>('api/todo/getAll');
  }

  public addTodo(todo: ITodo): Observable<boolean> {
    return this.httpClient.post<boolean>('api/todo/add', { data: todo });
  }

  public deleteTodo(todoId: string): Observable<any> {
    const params = new HttpParams().set('todoId', todoId);
    return this.httpClient.delete('api/todo/delete', { params });
  }

  public updateTodo(todo: ITodo): Observable<boolean> {
    return this.httpClient.put<boolean>('api/todo/update', { data: todo });
  }
}
