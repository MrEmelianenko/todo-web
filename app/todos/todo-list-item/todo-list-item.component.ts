import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Todo } from '../shared/todo';
import { UserTooltipDirective } from '../../users/shared/user-tooltip.directive';

@Component({
  selector: 'todo-list-item',
  directives: [UserTooltipDirective],
  templateUrl: 'app/todos/todo-list-item/todo-list-item.component.html'
})

export class TodoListItemComponent {
  @Input() todo: Todo;

  @Output() todoUpdate = new EventEmitter();
  @Output() todoDelete = new EventEmitter();

  changeDone(value: boolean) {
    this.todoUpdate.emit({ todo: this.todo, data: { done: value } });
  }

  changeText() {
    this.todoUpdate.emit({ todo: this.todo, data: { text: this.todo.text } });
  }

  deleteTodo() {
    this.todoDelete.emit(this.todo);
  }
}