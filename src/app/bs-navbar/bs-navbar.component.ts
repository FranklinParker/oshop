import { ShoppingCartComponent } from './../shopping-cart/shopping-cart.component';
import { UserService } from './../user/user.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { ShoppingCart } from '../shopping-cart/shopping-cart';
import { ShoppingCartItem } from '../shopping-cart/shopping-cart-item';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  user: User;
  totalItemsInCart = 0;
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
