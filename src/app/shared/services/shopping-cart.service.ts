import { ShoppingCartItem } from '../models/shopping-cart-item';
import { Product } from '../models/product';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { ShoppingCart } from '../models/shopping-cart';
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
    return this.addToRemoveFromCart(product, 1);
  }
  /**
   * deletes contents of cart
   *
   *
   */
  clearCart() {
    this.getShoppingCartItems().subscribe(cartItems =>
      cartItems.items.forEach(item =>
        this.deleteItemFromCart(cartItems.cartId, item.product.id)
      )
    );
  }
  /**
   *
   *
   */
  deleteItemFromCart(cartId: string, productId: string) {
    this.shopCartDb
      .doc('shopping-cart/' + cartId + '/items/' + productId)
      .delete();
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
      this.getProductCart(cartId, product.id).subscribe(
        (prod: ShoppingCartItem) => {
          const qty = prod ? prod.quantity + nbrItems : 0 + nbrItems;
          if (qty > 0) {
            this.shopCartDb
              .doc('shopping-cart/' + cartId + '/items/' + product.id)
              .set({
                product: product,
                quantity: qty
              });
          } else {
            this.deleteItemFromCart(cartId, product.id);
          }
        }
      );
    });
  }
  /**
   * gets the count of a shopping cart by pro
   *
   *
   * @param productId
   */
  getCartProductCount(productId: string) {
    const cartId = localStorage.getItem('cartId');

    return this.getProductCart(cartId, productId).map(
      (cart: ShoppingCartItem) => {
        return cart ? cart.quantity : 0;
      }
    );
  }
  /**
   * get cart for product
   *
   * @param cartId
   * @param productId
   */
  private getProductCart(cartId: string, productId: string) {
    return this.shopCartDb
      .collection('shopping-cart/' + cartId + '/items/')
      .doc(productId)
      .valueChanges()
      .take(1);
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
   *
   */
  getCartIdObservable(): Observable<any> {
    return Observable.fromPromise(this.getCartId());
  }
  /**
   *  Get shopping cart
   *
   */
  getShoppingCart(): Observable<ShoppingCart> {
    return this.getShoppingCartItems().map(cartItems => {
      const items: ShoppingCartItem[] = [];
      cartItems.items.forEach(item =>
        items.push(new ShoppingCartItem(item.product, item.quantity))
      );
      const cart = new ShoppingCart(items);
      return cart;
    });
  }

  /**
   *  Get shopping cart
   *
   */
  getShoppingCartItems(): Observable<{
    cartId: string;
    items: ShoppingCartItem[];
  }> {
    return this.getCartIdObservable().switchMap((cartId: string) =>
      this.shopCartDb
        .collection('shopping-cart/' + cartId + '/items')
        .valueChanges()
        .map((items: ShoppingCartItem[]) => {
          return {
            cartId: cartId,
            items: items
          };
        })
    );
  }
}
