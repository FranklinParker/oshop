import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './../products/product';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchmap';

import { ShoppingCart } from './shopping-cart';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class ShoppingCartService {


  constructor(private shopCartDb: AngularFirestore) {}
/**
 * add to cart
 *
 *
 * @param product
 */
 addToCart(product: Product) {
   this.addToRemoveFromCart(product, 1);
 }
/**
 * get the cart id
 *
 */
  getCartId() {

    return this.getOrCreateCartId();

  }
 /**
 * remove to cart
 *
 *
 * @param product
 */
removeFromCart(product: Product) {
  this.addToRemoveFromCart(product, -1);
}
  /**
   *  add to cart or create cart
   *
   *
   * @param prduct
   *
   */

  private addToRemoveFromCart(product: Product, nbrItems: number) {
    this.getOrCreateCartId().then(cartId => {
      this.getProductCart(cartId, product.id)
        .subscribe( (prod: ShoppingCartItem)  => {
          const qty = prod ? prod.quantity + nbrItems : (0) + nbrItems;
          if (qty > -1) {
            this.shopCartDb.collection('shopping-cart/' + cartId + '/items/')
              .doc(product.id).set({
              product: product,
              quantity: qty
            });
          }
        });
    });
  }


  /**
   * gets the count of a shopping cart by pro
   *
   *
   * @param productId
   */
  getCartProductCount(productId: string)  {
    const cartId = localStorage.getItem('cartId');

    return  this.getProductCart( cartId , productId).map((cart: ShoppingCartItem) => {
      return cart ? cart.quantity : 0;
    });
  }
/**
 * get cart for product
 *
 * @param cartId
 * @param productId
 */
  private getProductCart(cartId: string, productId: string) {
    return this.shopCartDb.collection('shopping-cart/' + cartId + '/items/')
    .doc(productId).valueChanges().take(1);
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
   * Get cart items
   *
   *
   * @param cartId
   *
   */
   getCartItems(cartId): Observable<ShoppingCartItem[]> {
    return this.shopCartDb.collection('shopping-cart/' + cartId + '/items').valueChanges()
      .map((data: ShoppingCartItem[]) => {
      const items: ShoppingCartItem[] = data;
      return items;
    });
  }

  getShoppingCart(cartId): Observable<ShoppingCart> {
    return this.shopCartDb.collection('shopping-cart/' + cartId + '/items').valueChanges()
      .map((items: ShoppingCartItem[]) => {
        const cartItems: ShoppingCartItem[] = [];
        items.forEach(item => cartItems.push( new ShoppingCartItem(item.product, item.quantity)) );
         const cart = new ShoppingCart(cartItems);
         return cart;
    });
  }

}
