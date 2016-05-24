import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

import { RESTService } from '../../shared/rest.service';
import { Todo, ITodo } from './todo';
import { Observable } from "rxjs/Observable";
import { AuthService } from "../../shared/auth.service";

@Injectable()
export class TodoService extends RESTService {
  constructor(http: Http, auth: AuthService) {
    super(http, auth);
  }

  getTodos() {
    return this.get('todos')
      .map(this.processData);
  }
  
  addTodo(todo: ITodo) {
    let body = JSON.stringify({
      todo: todo
    });
  
    return this.post('todos', body)
      .map(this.processData)
      .catch(this.catchError);
  }
  
  updateTodo(todo: Todo, data = null) {
    let body = JSON.stringify({
      todo: data || todo.raw()
    });
  
    todo.isUpdating = true;
  
    return this.patch('todos/' + todo.id, body)
      .map(this.processData)
      .catch(this.catchError)
      .finally(() => todo.isUpdating = false);
  }
  
  deleteTodo(id: number) {
    return this.delete('todos/' + id);
  }
  
  private processData(response: Response) {
    let data = response.json();

    if (data instanceof Array) {
      return data.map(todo => new Todo(todo));
    } else {
      return new Todo(data);
    }
  }

  // Errors structure:
  // {
  //   "errors": {
  //     "text": [
  //       { "error": "blank" }
  //     ]
  //   }
  // }
  //
  private catchError(error: any) {
    let errors = error.json().errors;
    debugger;
    return Observable.throw(errors);
  }
}