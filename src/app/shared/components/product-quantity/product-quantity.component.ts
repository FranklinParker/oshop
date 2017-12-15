import { Product } from '../../models/product';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {
  @Input('product') product: Product;
  private quantity = 0;
  constructor(private shoppingCartService: ShoppingCartService) {
  }

  ngOnInit() {
    this.shoppingCartService.getCartProductCount(this.product.id)
    .subscribe(qty => this.quantity = qty);


  }

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
    this.quantity ++;
  }

  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product );
    this.quantity--;
  }


}
