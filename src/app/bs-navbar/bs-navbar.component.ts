import { UserService } from './../user/user.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  user: User;
  constructor(public auth: AuthService,
            private userService: UserService) {
    auth.user$.subscribe( user => {
      if (user) {
          userService.getUser().subscribe((userRec) => {
              this.user = userRec;
              console.log('navBar: ', this.user);
          });
      } else {
        this.user = null;
      }
    });

   }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }

}
