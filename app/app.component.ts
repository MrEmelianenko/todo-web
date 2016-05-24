import { Component } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';

import { AuthService } from './shared/auth.service';
import { TodoListComponent } from './todos/todo-list/todo-list.component';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserNavComponent } from './users/user-nav/user-nav.component';

@Component({
  selector: 'todo-app',
  directives: [UserNavComponent, ROUTER_DIRECTIVES],
  templateUrl: 'app/app.component.html'
})

@Routes([
  { path: '/',        component: TodoListComponent },
  { path: '/sign-in', component: UserLoginComponent }
])

export class AppComponent {
  constructor(public auth: AuthService) {}
}