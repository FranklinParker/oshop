import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AdminAuthGuardService  implements CanActivate {

  constructor(private userService: UserService) {
  }
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    const user = this.userService.getCurrentUser();
    return user && user.isAdmin;
  }

}
