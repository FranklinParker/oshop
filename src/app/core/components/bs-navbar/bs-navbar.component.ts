import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartComponent } from '../../../shopping/components/shopping-cart/shopping-cart.component';
import { UserService } from '../../../shared/services/user.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { ShoppingCartItem } from '../../../shared/models/shopping-cart-item';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  user: User;
  totalItemsInCart = 0;
  subsciption: Subscription;
  constructor(
    public auth: AuthService,
    private userService: UserService,
    private cartService: ShoppingCartService
  ) {
    auth.user$.subscribe(user => {
      if (user) {
        userService.getUser().subscribe(userRec => {
          this.user = userRec;
        });
      } else {
        this.user = null;
      }
    });
  }

  ngOnInit() {
    this.cartService
    .getShoppingCart()
    .subscribe((cart: ShoppingCart) => {
      this.totalItemsInCart = cart.totalIemsInCart;
    });
  }

  logout() {
    this.auth.logout();
  }
}
