import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'user-login',
  templateUrl: 'app/users/user-login/user-login.component.html'
})

export class UserLoginComponent {
  email: string;
  password: string;

  constructor(private auth: AuthService, private router: Router) {
    if (auth.loggedIn()) {
      router.navigate(['/']);
    }
  }

  onSubmit() {
    // TODO: Process wrong credentials
    this.auth.login(this.email, this.password);
    this.router.navigate(['/']);
  }
}