import { Component, Input } from '@angular/core';
import { Todo } from './todo';

@Component({
  selector: 'todo-list-item',
  template: `
    {{ todo.text }} <small>by {{ todo.user.getFullName() }}</small>
  `
})

export class TodoListItemComponent {
  @Input()
  todo: Todo;
}