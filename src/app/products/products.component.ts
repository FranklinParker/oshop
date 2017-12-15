import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { Product } from '../shared/models/product';
import { Category } from '../shared/models/category';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[];
  categories: Category[] = [];

  selCategory;
  constructor(private productsService: ProductService, route: ActivatedRoute) {
    this.productsService
      .getProducts()
      .switchMap(prods => {
        this.filteredProducts = this.products = prods;
        return route.queryParamMap;
      })
      .subscribe(params => {
        this.selCategory = params.get('category');
        this.filterByCategory(this.selCategory);

      });

  }

  ngOnDestroy() {}
  filterByCategory(categoryName: string) {
    this.filteredProducts =
      !categoryName
        ? this.products
        : this.products.filter(p =>
            p.category.toLowerCase().includes(categoryName.toLowerCase())
          );
  }
}
