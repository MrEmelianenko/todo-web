import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { AuthService } from "./auth.service";

@Injectable()
export class RESTService {
  constructor(
    private http: Http,
    private auth: AuthService
  ) {}

  static BASE_URL = 'http://localhost:4000/';

  get(path, headers = {}, options = {}) {
    return this.http.get(this.build_path(path), this.options(headers, options));
  }

  post(path, body, headers = {}, options = {}) {
    return this.http.post(this.build_path(path), body, this.options(headers, options));
  }

  patch(path, body, headers = {}, options = {}) {
    return this.http.patch(this.build_path(path), body, this.options(headers, options));
  }

  put(path, body, headers = {}, options = {}) {
    return this.http.put(this.build_path(path), body, this.options(headers, options));
  }

  delete(path, headers = {}, options = {}) {
    return this.http.delete(this.build_path(path), this.options(headers, options));
  }

  private build_path(path) {
    return RESTService.BASE_URL + path;
  }

  private headers(headers = {}) {
    let default_headers = { 'Content-Type': 'application/json' };
    let api_key = this.auth.currentApiKey();

    if (api_key) {
      default_headers['X-API-KEY'] = api_key;
    }

    return new Headers(Object.assign({}, headers, default_headers));
  }

  private options(headers = {}, options = {}) {
    let default_options = { headers: this.headers(headers) };
    return new RequestOptions(Object.assign({}, options, default_options));
  }
}