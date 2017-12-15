import { ShoppingCart } from '../shopping-cart/shopping-cart';
import { ShoppingCartItem } from '../shopping-cart/shopping-cart-item';

export class Order {
  orderPlaced: number;
  items: any[];
  constructor(public userId: string, public  shipping: any, cart: ShoppingCart) {
    this.orderPlaced = new Date().getTime();
    this.items = cart.shoppingCartItems.map((item: ShoppingCartItem) => {
      return {
        poduct: {
          title: item.product.title,
          imageUrl: item.product.imageUrl,
          price: item.product.price
        },
        quantity: item.quantity,
        totalPrice: item.totalPrice
      };
    });
  }
}
