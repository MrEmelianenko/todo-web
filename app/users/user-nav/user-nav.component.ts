import { Component } from '@angular/core';

import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'user-nav',
  templateUrl: 'app/users/user-nav/user-nav.component.html'
})

export class UserNavComponent {
  constructor(public auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}