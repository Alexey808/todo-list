import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { TODO_LIST } from "../shared/fake-data";
import { logMessage } from "../utils/log-message";


@Injectable({
  providedIn: 'root'
})
export class FakeRestService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'GET' && req.url === 'api/todo-list') {
      logMessage('Interceptor run', '[GET] api/todo-list');
      return of(
        new HttpResponse({
          status: 200,
          body: TODO_LIST
        })
      );
    } else if (req.method === 'POST' && req.url === 'api/add') {
      logMessage('Interceptor run', '[DELETE] api/add', req.body);
      return of(
        new HttpResponse({
          status: 200,
          body: true,
        })
      );
    } else if (req.method === 'DELETE' && req.url === 'api/delete') {
      logMessage('Interceptor run', '[DELETE] api/delete');
      return of(
        new HttpResponse({
          status: 200,
          body: true,
        })
      );
    } else if (req.method === 'PUT' && req.url === 'api/update') {
      logMessage('Interceptor run', '[PUT] api/update', req.body);
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
