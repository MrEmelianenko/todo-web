import { Component } from '@angular/core';
import { TodoListComponent } from './todos/todo-list.component';

@Component({
  selector: 'todo-app',
  directives: [TodoListComponent],
  template: `
    <h1>Todo List</h1>
    <todo-list></todo-list>
  `
})

export class AppComponent {}