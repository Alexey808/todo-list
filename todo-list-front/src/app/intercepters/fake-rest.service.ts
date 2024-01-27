import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { TODO_LIST } from "../shared/fake-data";
import { logMessage } from "../utils/log-message";


@Injectable({
  providedIn: 'root'
})
export class FakeRestService implements HttpInterceptor {
  constructor() { console.log('init FakeRestService'); }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'GET' && req.url === 'api/todo/getAll') {
      logMessage('Interceptor run', '[GET] api/todo/getAll');
      return of(
        new HttpResponse({
          status: 200,
          body: TODO_LIST
        })
      );
    } else if (req.method === 'POST' && req.url === 'api/todo/add') {
      logMessage('Interceptor run', '[DELETE] api/todo/add', req.body);
      return of(
        new HttpResponse({
          status: 200,
          body: true,
        })
      );
    } else if (req.method === 'DELETE' && req.url === 'api/todo/delete') {
      logMessage('Interceptor run', '[DELETE] api/todo/delete');
      return of(
        new HttpResponse({
          status: 200,
          body: true,
        })
      );
    } else if (req.method === 'PUT' && req.url === 'api/todo/update') {
      logMessage('Interceptor run', '[PUT] api/todo/update', req.body);
      return of(
        new HttpResponse({
          status: 200,
          body: true,
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
