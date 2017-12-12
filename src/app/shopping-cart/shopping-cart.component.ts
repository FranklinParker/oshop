import { ShoppingCartService } from './shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from './shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart: ShoppingCart;
  constructor(private cartService: ShoppingCartService) {}

  ngOnInit() {
    this.cartService.getShoppingCart().subscribe((cart: ShoppingCart) => {
      this.cart = cart;
    });
  }
}
