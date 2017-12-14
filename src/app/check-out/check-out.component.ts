import { AuthService } from './../auth.service';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from './../shopping-cart/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingCart } from '../shopping-cart/shopping-cart';
import { ShoppingCartItem } from '../shopping-cart/shopping-cart-item';
import { OrderService } from '../order/order.service';

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
    private authServ: AuthService
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
    const order = {
      date: new Date(),
      shipping: this.shipping,
      items: this.cart.shoppingCartItems.map((item: ShoppingCartItem) => {
        return {
          poduct: {
            title: item.product.title,
            imageUrl: item.product.imageUrl,
            price: item.product.price
          },
          quantity: item.quantity,
          totalPrice: item.totalPrice
        };
      })
    };
    console.log('order', order);
    this.orderService.storeOrder(order);
  }
}
