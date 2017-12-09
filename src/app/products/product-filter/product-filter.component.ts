import { Component, OnInit, Input} from '@angular/core';
import { Category } from '../category';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories: Category[] = [];
  @Input('category') category;
  constructor(private productsService: ProductService) {
    this.productsService
    .getCategories()
    .subscribe(cat => (this.categories = cat));

  }

  ngOnInit() {
  }

}
