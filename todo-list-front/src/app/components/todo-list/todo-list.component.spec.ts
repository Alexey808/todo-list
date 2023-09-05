import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { TodoItemComponent } from "../todo-item/todo-item.component";
import { TodoApiService } from "../../api/todo-api.service";
import { of } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        TodoListComponent,
        TodoItemComponent,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of([]),
          }
        },
        {
          provide: TodoApiService,
          useValue: {
            updateTodo: () => of(true),
            deleteTodo: () => of(true),
            addTodo: () => of(true),
          }
        }
      ]
    });
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
