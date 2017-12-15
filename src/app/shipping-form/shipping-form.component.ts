import { OrderService } from '../shared/services/order.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCart } from '../shopping-cart/shopping-cart';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { Order } from '../order/order';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  shipping = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: ''
  };
  @Input('cart') cart: ShoppingCart;
  userSubscription: Subscription;
  userId: string;
  constructor(
    private orderService: OrderService,
    private authServ: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userSubscription = this.authServ.user$.subscribe(
      user => (this.userId = user.uid)
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
  placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);

    console.log('order', order);
    this.orderService.storeOrder(order).then(orderResult => {
      console.log('order placed - id ' + orderResult.id);
      this.router.navigate(['order-success', orderResult.id]);
    });
  }
}
