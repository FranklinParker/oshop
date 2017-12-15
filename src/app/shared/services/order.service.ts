import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from './shopping-cart.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Order } from '../models/order';

@Injectable()
export class OrderService {
  constructor(private orderDb: AngularFirestore,
       private cartService: ShoppingCartService) {}

  storeOrder(order: Order) {
    this.cartService.clearCart();
    return this.orderDb.collection('orders').add({
      order: {
        items: order.items,
        datePlaced: order.orderPlaced,
        shipping: order.shipping
      }
    });
  }

  getOrders() {
    return this.orderDb.collection('orders')
    .valueChanges()
    .map(orders =>  {
      const orderArr: Order[] = [];
      orders.forEach( (order) => {
         const orderRec = order['order'];
         console.log('order Item ', order['order']);
         orderArr.push(orderRec);

      });
      return orderArr;
     } );
  }

}
