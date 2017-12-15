import { Product } from '../../shared/models/product';
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Subscription } from 'rxjs/Subscription';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy, AfterViewInit {
  subscription: Subscription;
  products: Product[];
  filteredProducts: Product[];
  showHtmlTable = false;
  displayedColumns = ['title', 'price', 'category', 'edit'];
  dataSource = new MatTableDataSource<Product>(this.products);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productsService: ProductService,
              private router: Router) {
    this.subscription = this.productsService.getProducts()
      .subscribe(prods =>  {this.filteredProducts = this.products = prods;
                            this.dataSource.data = this.products;
      });

   }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
  }
  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  /**
   * Angular material table filter
   *
   * @param filterValue
   *
   */
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  /**
   * html table filter
   *
   *
   * @param filterText  f
   */
  filterProducts(filterText: string) {
    console.log('search by:' + filterText);
    this.filteredProducts = (filterText) ?
      this.products.filter( p => p.title.toLowerCase().includes(filterText.toLowerCase())) :
         this.products;
  }

  editElement(id) {
    this.router.navigate(['/admin/products/' + id]);
   }

  showProducts() {
    const products: Product[] = importJson.products;
    products.forEach( p => this.productsService.addProduct(p));

  }

}


const importJson = {
  'categories' : {
    'bread' : {
      'name' : 'Bread'
    },
    'dairy' : {
      'name' : 'Dairy'
    },
    'fruits' : {
      'name' : 'Fruits'
    },
    'seasonings' : {
      'name' : 'Seasonings and Spices'
    },
    'vegetables' : {
      'name' : 'Vegetables'
    }
  },
  'products' : [
      {
      'category' : 'vegetables',
      'imageUrl' : 'http://www.publicdomainpictures.net/pictures/170000/velka/spinach-leaves-1461774375kTU.jpg',
      'price' : 2.5,
      'title' : 'Spinach'
    },
     {
      'category' : 'bread',
      'imageUrl' : 'https://static.pexels.com/photos/2434/bread-food-healthy-breakfast.jpg',
      'price' : 3,
      'title' : 'Freshly Baked Bread'
    },
     {
      'category' : 'fruits',
      'imageUrl' : 'https://pixnio.com/free-images/2017/03/17/2017-03-17-09-15-56.jpg',
      'price' : 1.75,
      'title' : 'Avacado'
    },
    {
      'category' : 'vegetables',
      'imageUrl' : 'https://static.pexels.com/photos/8390/food-wood-tomatoes.jpg',
      'price' : 2.5,
      'title' : 'Tomato'
    },
    {
      'category' : 'vegetables',
      'imageUrl' : 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Lettuce_Mini_Heads_%287331119710%29.jpg',
      'price' : 1,
      'title' : 'Lettuce'
    },
    {
      'category' : 'fruits',
      'imageUrl' : 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Bananas.jpg/1024px-Bananas.jpg',
      'price' : 1.25,
      'title' : 'Banana'
    },
     {
      'category' : 'fruits',
      'imageUrl' : 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Orange-Fruit-Pieces.jpg',
      'price' : 1.7,
      'title' : 'Orange'
    },
    {
      'category' : 'fruits',
      'imageUrl' : 'https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg',
      'price' : 2,
      'title' : 'Apple'
    },
     {
      'category' : 'fruits',
      'imageUrl' : 'https://upload.wikimedia.org/wikipedia/commons/3/36/Kyoho-grape.jpg',
      'price' : 2,
      'title' : 'Grape'
    },
    {
      'category' : 'fruits',
      'imageUrl' : 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Autumn_Red_peaches.jpg',
      'price' : 2,
      'title' : 'Peach'
    },
    {
      'category' : 'seasonings',
      'imageUrl' : 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Cinnamon-other.jpg',
      'price' : 0.5,
      'title' : 'Cinnamon Sticks'
    },
   {
      'category' : 'seasonings',
      'imageUrl' : 'https://upload.wikimedia.org/wikipedia/commons/4/48/Saffron_Crop.JPG',
      'price' : 3,
      'title' : 'Saffron'
    },
    {
      'category' : 'seasonings',
      'imageUrl' : 'http://maxpixel.freegreatpicture.com/static/photo/1x/Seasoning-Powder-Curry-Spice-Ingredient-Turmeric-2344157.jpg',
      'price' : 0.75,
      'title' : 'Ground Turmeric'
    },
    {
      'category' : 'seasonings',
      'imageUrl' : 'http://maxpixel.freegreatpicture.com/static/photo/1x/Ingredient-Herb-Seasoning-Seeds-Food-Coriander-390015.jpg',
      'price' : 0.5,
      'title' : 'Coriander Seeds'
    },
   {
      'category' : 'bread',
      'imageUrl' : 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Fabrication_du_lavash_%C3%A0_Noravank_%286%29.jpg/1280px-Fabrication_du_lavash_%C3%A0_Noravank_%286%29.jpg',
      'price' : 1.25,
      'title' : 'Lavash Bread'
    },
    {
      'category' : 'bread',
      'imageUrl' : 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Bagel-Plain-Alt.jpg',
      'price' : 1,
      'title' : 'Bagel Bread'
    },
    {
      'category' : 'fruits',
      'imageUrl' : 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Strawberries.jpg',
      'price' : 1.95,
      'title' : 'Strawberry'
    },
     {
      'category' : 'bread',
      'imageUrl' : 'https://static.pexels.com/photos/416607/pexels-photo-416607.jpeg',
      'price' : 1.25,
      'title' : 'Baguette Bread'
    }]

};


