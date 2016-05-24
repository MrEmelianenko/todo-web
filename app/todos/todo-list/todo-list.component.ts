import { Component } from '@angular/core';

import { Todo } from '../shared/todo';
import { TodoService } from '../shared/todo.service';
import { TodoListAddComponent } from '../todo-list-add/todo-list-add.component';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';

@Component({
  selector: 'todo-list',
  directives: [TodoListAddComponent, TodoListItemComponent],
  providers: [TodoService],
  templateUrl: 'app/todos/todo-list/todo-list.component.html'
})

export class TodoListComponent {
  public todos;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getTodos()
      .subscribe(todos => this.todos = todos);
  }

  onCreateTodo(todo: Todo) {
    this.todos.push(todo);
  }
  
  onUpdateTodo(event) {
    this.todoService.updateTodo(event.todo, event.data)
      .subscribe((todo) => Object.assign(event.todo, todo));
  }

  onDeleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo.id)
      .subscribe(() =>
        this.todos = this.todos.filter((item) => item.id != todo.id)
      );
  }
}