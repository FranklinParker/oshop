import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ShoppingCartService } from './../shopping-cart/shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../products/product';
import { UNIQUE_SELECTION_DISPATCHER_PROVIDER } from '@angular/cdk/collections/typings/unique-selection-dispatcher';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  @Input('showActions') showActions = true;

  quantity = 0;
  constructor(private shoppingCartService: ShoppingCartService) {
  }

  ngOnInit() {
    if ( this.showActions ) {
      this.resetQuantity();
    }
  }

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
    this.quantity ++;
  }

  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product );
    this.quantity--;
  }

  private resetQuantity() {
    this.shoppingCartService.getCartProductCount(this.product.id)
    .subscribe(qty => this.quantity = qty);

  }



}
