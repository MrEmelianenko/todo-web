import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

import { User } from './user';
import { AuthService } from '../../shared/auth.service';
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserService {
  constructor(private http: Http, private auth: AuthService) {}

  getUser(id: number) {
    return this.http.get('http://localhost:3001/users/' + id)
      .map(this.processData);
  }

  getUsers() {
    return this.http.get('http://localhost:3001/users')
      .map(this.processData);
  }

  updateUser(user: User, data = null) {
    let headers = new Headers({ 'Content-Type': 'application/json', 'X-API-KEY': this.auth.currentApiKey() });
    let options = new RequestOptions({ headers: headers });

    let body = JSON.stringify({
      user: data || user.raw()
    });

    user.isUpdating = true;

    return this.http.patch('http://localhost:3001/users/' + user.id, body, options)
      .map(this.processData)
      .catch(this.catchError)
      .finally(() => user.isUpdating = false);
  }

  deleteUser(id: number) {
    let headers = new Headers({ 'Content-Type': 'application/json', 'X-API-KEY': this.auth.currentApiKey() });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete('http://localhost:3001/users/' + id, options);
  }

  private processData(response: Response) {
    let data = response.json();

    if (data instanceof Array) {
      return data.map(user => new User(user));
    } else {
      return new User(data);
    }
  }

  private catchError(error: any) {
    let errorMessage = error.message || error.statusText || 'Server error';
    console.log(errorMessage);
    return Observable.throw(errorMessage);
  }
}