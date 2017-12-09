import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import { Category } from './category';
import { Product } from './product';

@Injectable()
export class ProductService {
  constructor(private db: AngularFirestore) {}

  getCategories(): Observable<Category[]> {
    return this.db
      .collection('categories', ref => ref.orderBy('name'))
      .snapshotChanges()
      .map(action => {
        return action.map(a => {
          const data = a.payload.doc.data() as Category;
          data.id = a.payload.doc.id;
          return data;
        });
      });
  }
  /**
   * saves a new poduct
   *
   * @param product
   */
  addProduct(product) {
    this.db.collection('products').add({
      title: product.title,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl
    });
  }
  /**
   * update an existing product
   *
   * @param product
   * @param id
   */

  updateProduct(product, id) {
    this.db.doc('products/' + id).update(product);
  }

  delete(id) {
    this.db.doc('products/' + id).delete();
  }

  getProducts(): Observable<Product[]> {
    return this.db
      .collection('products', ref => ref.orderBy('title'))
      .snapshotChanges()
      .map(action => {
        return action.map(a => {
          const product = a.payload.doc.data() as Product;
          product.id = a.payload.doc.id;
          return product;
        });
      });
  }

  getProduct(productId): Observable<Product> {
    const productResult: AngularFirestoreDocument<Product> = this.db.doc(
      'products/' + productId
    );
    return productResult.valueChanges();
  }
}
