import { Directive, Input } from '@angular/core';

import { User } from "./user";

@Directive({
  selector: '[userTooltip]',
  host: {
    '(click)': 'onClick()'
  }
})

export class UserTooltipDirective {
  @Input('userTooltip') user: User;

  onClick() {
    alert("This is tooltip for " + this.user.getFullName());
  }
}