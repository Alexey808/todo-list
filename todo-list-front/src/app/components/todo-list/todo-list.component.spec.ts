import { ComponentFixture, TestBed, fakeAsync} from '@angular/core/testing';

import { TodoModelStab } from '../todo-item/todo-model.stab';
import { TodoListComponent } from './todo-list.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoApiService } from '../../api/todo-api.service';
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ITodo } from '../todo-item/todo-item.interfaces';


jest.useFakeTimers().setSystemTime(new Date('2000-01-01T00:00:00Z'));

jest.mock('../todo-item/todo-model', () => {
  return { TodoModel: TodoModelStab};
});

const testTodo1 = {
  id: 'todoId1',
  title: 'test-todo1',
  date: new Date('2000-01-01T00:00:00Z').getTime(),
  done: false,
};



describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let activatedRoute: ActivatedRoute;
  let todoApiService: TodoApiService;

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
    activatedRoute = TestBed.inject(ActivatedRoute);
    todoApiService = TestBed.inject(TodoApiService);
    
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set todoList', fakeAsync (() => {
    activatedRoute.data = of({todos: [testTodo1]});
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.todoList()).toEqual([testTodo1]);
    });
  }));

  describe('updateTodo', () => {
    const changedTodo1: ITodo = {
      ...testTodo1,
      done: true,
    };

    beforeEach(() => {
      component.todoList.set([testTodo1]);
    });

    it('should be success', () => {
      jest.spyOn(todoApiService, 'updateTodo')
        .mockReturnValueOnce(of(true));
      
      component.updateTodo(changedTodo1);
  
      expect(todoApiService.updateTodo).toHaveBeenCalled();
      expect(component.todoList()).toEqual([changedTodo1]);
    });
  
    it('should be failed', () => {
      jest.spyOn(todoApiService, 'updateTodo')
        .mockReturnValueOnce(throwError(() => new Error('Error message')));

      component.updateTodo(changedTodo1);
  
      expect(todoApiService.updateTodo).toHaveBeenCalled();
      expect(component.todoList()).toEqual([testTodo1]);
    });
  });

  describe('deleteTodo', () => {
    const testTodo2: ITodo = {
      ...testTodo1,
      id: 'todoId2',
    };

    beforeEach(() => {
      component.todoList.set([testTodo1, testTodo2]);
    });

    it('should be success', () => {
      jest.spyOn(todoApiService, 'deleteTodo')
        .mockReturnValueOnce(of(true));
      
      component.deleteTodo(testTodo1.id);
  
      expect(todoApiService.deleteTodo).toHaveBeenCalled();
      expect(component.todoList()).toEqual([testTodo2]);
    });
  
    it('should be failed', () => {
      jest.spyOn(todoApiService, 'deleteTodo')
        .mockReturnValueOnce(throwError(() => new Error('Error message')));

      component.deleteTodo(testTodo1.id);
  
      expect(todoApiService.deleteTodo).toHaveBeenCalled();
      expect(component.todoList()).toEqual([testTodo1, testTodo2]);
    });
  });

  describe('newTodo', () => {
    const newTodo: ITodo = {
      date: new Date('2000-01-01T00:00:00Z').getTime(),
      done: false,
      id: 'todo0',
      title: 'Todo-0',
    };

    beforeEach(() => {
      component.todoList.set([testTodo1]);
    });

    it('should be success', () => {
      jest.spyOn(todoApiService, 'addTodo')
        .mockReturnValueOnce(of(true));
      
      component.newTodo();
  
      expect(todoApiService.addTodo).toHaveBeenCalled();
      expect(component.todoList()).toEqual([newTodo, testTodo1]);
    });
  
    it('should be failed', () => {
      jest.spyOn(todoApiService, 'addTodo')
        .mockReturnValueOnce(throwError(() => new Error('Error message')));

      component.newTodo();
  
      expect(todoApiService.addTodo).toHaveBeenCalled();
      expect(component.todoList()).toEqual([testTodo1]);
    });
  });
});
