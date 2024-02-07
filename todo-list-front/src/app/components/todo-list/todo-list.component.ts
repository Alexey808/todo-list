import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ITodo } from '../todo-item/todo-item.interfaces';
import { ActivatedRoute } from '@angular/router';
import { map, take, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoApiService } from '../../api/todo-api.service';
import { TodoModel } from '../todo-item/todo-model';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  standalone: true,
  imports: [CommonModule, TodoItemComponent]
})
export class TodoListComponent implements OnInit {
  todoList: WritableSignal<ITodo[]> = signal([]);

  constructor(
    private activatedRoute: ActivatedRoute,
    private todoApiService: TodoApiService,
  ) {}

  ngOnInit() {
    this.activatedRoute.data.pipe(
      map(({todos}) => todos as ITodo[]),
    ).pipe(take(1)).subscribe((todoList: ITodo[]) => {
      this.todoList.set(todoList);
    });
  }

  public updateTodo(changedTodo: ITodo): void {
    this.todoApiService.updateTodo(changedTodo).pipe(
      tap(() => {
        this.todoList.set(
          this.todoList().map((todo) => {
            return todo.id === changedTodo.id ? changedTodo : todo;
          })
        );
      }),
      take(1)
    ).subscribe();
  }

  public deleteTodo(todoId: string): void {
    this.todoApiService.deleteTodo(todoId).pipe(
      tap(() => {
        this.todoList.set(
          this.todoList().filter((todo) => todo.id !== todoId)
        );
      }),
      take(1)
    ).subscribe();
  }

  public newTodo(): void {
    const newTodo = { ...new TodoModel() };

    this.todoApiService.addTodo(newTodo).pipe(
      tap(() => {
        this.todoList.set([
          newTodo,
          ...this.todoList()
        ]);
      }),
      take(1)
    ).subscribe();
  }

}
