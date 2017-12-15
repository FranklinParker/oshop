import { ShoppingCartService } from './../shopping-cart/shopping-cart.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Order } from './order';

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

  // return this.shopCartDb.collection('orders/' +).doc(order.userId).set({
  //   items: order.items,
  //   datePlaced: order.orderPlaced,
  //   shipping: order.shipping

  // });
}
