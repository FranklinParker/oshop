import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from './../shopping-cart/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingCart } from '../shopping-cart/shopping-cart';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  cart: ShoppingCart;
  cartSubscription: Subscription;
  constructor(private cartService: ShoppingCartService) {}

  ngOnInit() {
    this.cartSubscription = this.cartService
      .getShoppingCart()
      .subscribe((cart: ShoppingCart) => (this.cart = cart));
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }
}
