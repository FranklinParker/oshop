import { AuthService } from './../auth.service';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from './../shopping-cart/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingCart } from '../shopping-cart/shopping-cart';
import { ShoppingCartItem } from '../shopping-cart/shopping-cart-item';
import { OrderService } from '../order/order.service';
import { Order } from '../order/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: ''
  };
  cart: ShoppingCart;
  cartSubscription: Subscription;
  userSubscription: Subscription;
  userId: string;
  constructor(
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    private authServ: AuthService,
    private router: Router
  ) {}


  ngOnInit() {
    this.cartSubscription = this.cartService
      .getShoppingCart()
      .subscribe((cart: ShoppingCart) => (this.cart = cart));
      this.authServ.user$.subscribe(user => (this.userId = user.uid));

  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }
  placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);

    console.log('order', order);
    this.orderService.storeOrder(order).
      then(orderResult => {
        console.log('order placed - id '  + orderResult.id);
        this.router.navigate(['order-success', orderResult.id]);
      });
  }
}
