import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITodo } from './todo-item.interfaces';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class TodoItemComponent {
  @Input() public set todoItem(todo: ITodo) {
    this.todo = todo;
    this.setTodoForm(todo);
  }
  @Output() public updateTodo: EventEmitter<ITodo> = new EventEmitter<ITodo>();
  @Output() public deleteTodo: EventEmitter<string> = new EventEmitter<string>();

  public todoForm = new FormGroup({});
  public todo: ITodo | null = null;
  public isEdit: boolean = false;
  public isSaved: boolean = false;

  private get currentTodo(): ITodo | null {
    return this.todo ? {
      ...this.todo,
      title: this.todoForm.get('title')?.getRawValue(),
      done: this.todoForm.get('done')?.getRawValue(),
    } : null;
  }

  constructor(
    private fb: FormBuilder,
  ) {}

  private setTodoForm(todo: ITodo): void {
    const formData = Object.entries(todo).reduce((result, todoEntries) => {
      return {
        ...result,
        ...(todoEntries[0] === 'title' || todoEntries[0] === 'done'
          ? {[todoEntries[0]]: todoEntries[1]}
          : {}
        ),
      };
    }, {});
    this.todoForm = this.fb.group(formData);
  }

  private updateCurrentTodo(): void {
    if (this.currentTodo?.id) {
      this.updateTodo.emit(this.currentTodo);
    }
  }

  public onEdit(): void {
    this.isEdit = !this.isEdit;
  }

  public onDelete(): void {
    const todoId = this.todo?.id;
    if (todoId) {
      this.deleteTodo.emit(this.todo?.id);
    }
  }

  public onSave(): void {
    this.onEdit();
    this.updateCurrentTodo();
  }

  public onDone(): void {
    this.updateCurrentTodo();
  }
}
