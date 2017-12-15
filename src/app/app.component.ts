import { TestBed } from '@angular/core/testing';
import { UserService } from './shared/services/user.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    auth: AuthService,
    router: Router,
    private userService: UserService
  ) {
    auth.user$.subscribe(user => {
      if (!user) {
        return;
      }
      userService.save(user);

      const returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) {
        return;
      }
      localStorage.removeItem('returnUrl');

      router.navigateByUrl(returnUrl);
    });
  }
}
