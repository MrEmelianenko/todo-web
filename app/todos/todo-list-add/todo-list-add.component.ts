import { Component, Output, EventEmitter } from '@angular/core';

import { ITodo } from "../shared/todo";
import { TodoService } from "../shared/todo.service";

@Component({
  selector: 'todo-list-add',
  providers: [TodoService],
  templateUrl: 'app/todos/todo-list-add/todo-list-add.component.html'
})

export class TodoListAddComponent {
  @Output() todoCreate = new EventEmitter();

  todo: ITodo = {
    id: null,
    user: null,
    text: null,
    done: false
  };

  errors = {};

  constructor(private todoService: TodoService) {}

  addTodo() {
    let _this = this;

    this.todoService.addTodo(this.todo)
      .subscribe(
        function(todo) {
          _this.todoCreate.emit(todo);
          _this.todo.text = '';
          _this.errors = {};
        },
        function (errors) {
          _this.errors = errors;
        }
      );
  }
}