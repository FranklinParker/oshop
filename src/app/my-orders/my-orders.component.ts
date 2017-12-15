import { OrderService } from './../order/order.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Order } from '../order/order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders: Order[] = [];
  constructor(orderService: OrderService, authService: AuthService) {
    authService.user$.subscribe(user => {
      const userId = user.uid;
      orderService.getOrders().subscribe(orders => {
        console.log(orders);
        this.orders = orders;
        console.log('orders recv', this.orders);
      });
    });
  }

  ngOnInit() {}
}
