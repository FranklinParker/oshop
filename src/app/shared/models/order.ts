import { ShoppingCart } from './shopping-cart';
import { ShoppingCartItem } from './shopping-cart-item';

export class Order {
  public orderPlaced: number;
  items: any[];
  constructor(public userId: string, public  shipping: any, cart: ShoppingCart) {
    this.orderPlaced = new Date().getTime();
    this.items = cart.shoppingCartItems.map((item: ShoppingCartItem) => {
      return {
        product: {
          title: item.product.title,
          imageUrl: item.product.imageUrl,
          price: item.product.price
        },
        quantity: item.quantity,
        totalPrice: item.totalPrice
      };
    });
  }

  get totalCost(){
    let totalCost = 0;
    this.items.forEach(item => totalCost += item.totalPrice);
    return totalCost;

  }
}
