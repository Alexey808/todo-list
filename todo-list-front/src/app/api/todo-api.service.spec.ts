import { TestBed } from '@angular/core/testing';

import { TodoApiService } from './todo-api.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ITodo } from '../components/todo-item/todo-item.interfaces';

const testTodo: ITodo = {
  date: 946670400000, // 01.01.2000
  done: true,
  id: "t-100000000000",
  title: "Todo-0",
}

describe('TodoApiService', () => {
  let service: TodoApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(TodoApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTestingController.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getTodos', (done) => {
    const todos = [testTodo];

    service.getTodos().subscribe((res) => {
      expect(res).toEqual(todos);
      done();
    });

    const req = httpTestingController.expectOne('api/todo/getAll');
    expect(req.request.method).toBe('GET');

    req.flush(todos);
  });

  it('addTodo', (done) => {
    const newTodo = testTodo;

    service.addTodo(newTodo).subscribe((res) => {
      expect(res).toBeTruthy();
      done();
    });

    const req = httpTestingController.expectOne('api/todo/add');
    expect(req.request.method).toBe('POST');

    req.flush(true);
  });

  it('deleteTodo', (done) => {
    const todoId = 'id123';

    service.deleteTodo(todoId).subscribe((res) => {
      expect(res).toBeTruthy();
      done();
    });

    const req = httpTestingController.expectOne('api/todo/delete?todoId=id123');
    expect(req.request.method).toBe('DELETE');

    req.flush(true);
  });

  it('updateTodo', (done) => {
    const updatedTodo = testTodo;

    service.updateTodo(updatedTodo).subscribe((res) => {
      expect(res).toBeTruthy();
      done();
    });

    const req = httpTestingController.expectOne('api/todo/update');
    expect(req.request.method).toBe('PUT');

    req.flush(true);
  });
});
