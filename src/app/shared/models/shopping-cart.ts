import { ShoppingCartItem } from './shopping-cart-item';



export class ShoppingCart {

  constructor(public shoppingCartItems: ShoppingCartItem[] ){}

  get totalIemsInCart(){
    let count = 0;
    this.shoppingCartItems.forEach( item => count += item.quantity);
    return count;
  }

  get totalPrice(){
    let totalCost = 0;
    this.shoppingCartItems.forEach( item => totalCost += item.totalPrice);
    return totalCost;

  }
}
