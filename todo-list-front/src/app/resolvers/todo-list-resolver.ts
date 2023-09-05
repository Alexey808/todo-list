import { TodoApiService } from "../api/todo-api.service";
import { Observable } from "rxjs";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { ITodo } from "../components/todo-item/todo-item.interfaces";


export const TodoListResolver: ResolveFn<ITodo[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  todoApiService: TodoApiService = inject(TodoApiService),
): Observable<ITodo[]> => todoApiService.getTodos();
