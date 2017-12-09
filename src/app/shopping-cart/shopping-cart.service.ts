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
      const pathProduct = 'shopping-cart/' + cartId + '/' + product.id;
      this.getProductInCart(
        pathProduct
      ).subscribe(prod => {
        console.log('product found', prod);
        if (!prod[0]) {
          this.shopCartDb
            .collection(pathProduct)
            .add({
              title: product.title,
              price: product.price,
              quantity: 1
            }).then(docref => localStorage.setItem(product.id, docref.id ));
        } else {
            const pathDoc = pathProduct + '/' + localStorage.getItem(product.id);
            console.log(' path document' + pathDoc);
            this.shopCartDb.doc(pathDoc).update({
             quantity: prod[0].quantity + 1
           });
         }
      });
    });
  }

  private async getOrCreateCartId() {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }
    const cart = await this.createCart();
    localStorage.setItem('cartId', cart.id);
    return cart.id;
  }

  private getProductInCart(path): Observable<any> {
    const cartResult: AngularFirestoreCollection<
      any
    > = this.shopCartDb.collection(path);

    return cartResult.valueChanges().take(1);
  }

  private getCart(cartId): Observable<any> {
    const cartResult: AngularFirestoreDocument<any> = this.shopCartDb.doc(
      'shopping-cart/' + cartId
    );
    return cartResult.valueChanges();
  }

  private createCart() {
    return this.shopCartDb.collection('shopping-cart').add({
      dateCreated: new Date().getTime()
    });
  }
}
