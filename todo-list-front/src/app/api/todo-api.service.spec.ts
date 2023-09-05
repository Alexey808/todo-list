import { TestBed } from '@angular/core/testing';

import { TodoApiService } from './todo-api.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('TodoApiService', () => {
  let service: TodoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(TodoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
