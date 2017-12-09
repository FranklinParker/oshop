import { Product } from './../products/product';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

@Injectable()
export class ShoppingCartService {
  constructor(private shopCartDb: AngularFirestore) {}

  /**
   *  add to cart or create cart
   *
   *
   * @param prduct
   *
   */

  addToCart(product: Product) {
    this.getOrCreateCartId().then(cartId => {
      console.log('cartId:' + cartId);
      this.shopCartDb.collection('shopping-cart/' + cartId + '/items/')
        .doc(product.id).valueChanges().take(1)
        .subscribe(prod => {
          console.log('product ', prod);
          const quantity = prod ? prod.quantity + 1 : 1;
          this.shopCartDb
            .collection('shopping-cart/' + cartId + '/items/').doc(product.id).set({
              id: product.id,
              title: product.title,
              price: product.price,
              quantity: quantity
            });
        });
    });
  }
  /**
   * get cart id
   *
   *
   */
  private async getOrCreateCartId() {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }
    const cart = await this.createCart();
    localStorage.setItem('cartId', cart.id);
    return cart.id;
  }
  /**
   * create cart if not there
   *
   */
  private createCart() {
    return this.shopCartDb.collection('shopping-cart').add({
      dateCreated: new Date().getTime()
    });
  }
  /**
   * Get cart currently not used
   *
   *
   * @param cartId
   *
   */
  private getCart(cartId): Observable<any> {
    const cartResult: AngularFirestoreDocument<any> = this.shopCartDb.doc(
      'shopping-cart/' + cartId
    );
    return cartResult.valueChanges();
  }
}
