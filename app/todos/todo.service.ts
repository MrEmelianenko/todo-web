import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Todo } from './todo'

@Injectable()
export class TodoService {
  constructor(private http: Http) {}

  getTodos() {
    return this.http.get('http://localhost:3001/todos')
      .map(response => {
        return response.json().map(todo => new Todo(todo));
      });
  }
}