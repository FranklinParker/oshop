import { ShoppingCartService } from './../shopping-cart/shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../products/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  @Input('showActions') showActions = true;
  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {}

  addToCart(product: Product) {
    this.shoppingCartService.addToCart(product);
  }

}
