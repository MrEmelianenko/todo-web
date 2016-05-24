import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { User } from '../users/shared/user';
import { RESTService } from "./rest.service";

@Injectable()
export class AuthService {
  constructor(private http: Http) {
    this.loadUserFromStorage();
  }

  private user: User;
  public static STORAGE_USER_KEY = 'current_user';
  public static STORAGE_API_KEY = 'current_user_api_key';

  currentUser() {
    return this.user;
  }

  currentApiKey() {
    return this.loadFromStorage()[1];
  }

  loadUserFromStorage() {
    let user;
    let [storage_user, storage_api_key] = this.loadFromStorage();

    if (storage_user && storage_api_key) {
      user = User.deserialize(storage_user);
      this.user = user;
    } else {
      this.clearStorage();
      localStorage.removeItem(AuthService.STORAGE_USER_KEY);
      localStorage.removeItem(AuthService.STORAGE_API_KEY);
    }

    return !!user;
  }

  login(email: string, password: string) {
    let _this = this;

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let user = null;

    let body = JSON.stringify({
      email: email,
      password: password
    });

    this.http.post(RESTService.BASE_URL + 'users/login', body, options)
      .map((response) => response.json())
      .subscribe(function(response) {
        user = new User(response);

        _this.user = user;
        _this.saveToStorage(user, response['api_key']);
      });
  }

  logout() {
    this.user = null;
    this.clearStorage();
  }

  loggedIn() {
    return !!this.currentUser();
  }

  private saveToStorage(user: User, api_key: string) {
    localStorage.setItem(AuthService.STORAGE_USER_KEY, user.serialize());
    localStorage.setItem(AuthService.STORAGE_API_KEY, api_key);
  }

  private loadFromStorage() {
    return [
      localStorage.getItem(AuthService.STORAGE_USER_KEY),
      localStorage.getItem(AuthService.STORAGE_API_KEY)
    ]
  }

  private clearStorage() {
    localStorage.removeItem(AuthService.STORAGE_USER_KEY);
    localStorage.removeItem(AuthService.STORAGE_API_KEY);
  }
}