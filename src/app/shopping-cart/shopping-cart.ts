import { ShoppingCartItem } from './shopping-cart-item';



export class ShoppingCart {

  constructor(public shoppingCartItems: ShoppingCartItem[] ){}

  get totalIemsInCart(){
    let count = 0;
    this.shoppingCartItems.forEach( item => count += item.quantity);
    return count;
  }
}
