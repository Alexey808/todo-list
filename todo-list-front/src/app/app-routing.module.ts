import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListResolver } from './resolvers/todo-list-resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'todo-list',
    pathMatch: 'full',
  },
  {
    path: 'todo-list',
    loadComponent: () => import('./components/todo-list/todo-list.component')
      .then((c) => c.TodoListComponent),
    resolve: {
      todos: TodoListResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
