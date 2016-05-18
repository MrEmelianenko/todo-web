import { Component } from '@angular/core';

import { User } from '../users/user';
import { Todo } from './todo';
import { TodoService } from './todo.service';
import { TodoListItemComponent } from './todo-list-item.component';

@Component({
  selector: 'todo-list',
  directives: [TodoListItemComponent],
  providers: [TodoService],
  template: `
    <div class="todo-list">
      <div *ngFor="let todo of todos" (click)="onSelect(todo)" class="todo-list-item">
        <todo-list-item [todo]="todo"></todo-list-item>
      </div>
    </div>
  `
})

export class TodoListComponent {
  public todos;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getTodos()
      .subscribe(todos => this.todos = todos);
  }
}