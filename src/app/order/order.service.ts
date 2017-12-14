import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class OrderService {

  constructor(private shopCartDb: AngularFirestore) {

  }


  storeOrder(order) {
    return this.shopCartDb.collection('orders').add(order);

  }




}
