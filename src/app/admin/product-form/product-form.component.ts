import { ProductService } from '../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../shared/models/product';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  id;
  product: Product = { title: '', price: null, category: '', imageUrl: '' };
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories$ = productService.getCategories();
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('id:' + this.id);
    if (this.id) {
      this.productService
        .getProduct(this.id)
        .take(1)
        .subscribe(p => this.product = p);
    }
  }

  ngOnInit() {}
  save(values) {
    if (this.id) {
      this.productService.updateProduct(this.product, this.id);
    } else {
      this.productService.addProduct(values);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete?')) {
      return;
    }
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
}
