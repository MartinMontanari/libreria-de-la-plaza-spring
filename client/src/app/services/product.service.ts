import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsBaseUrl = 'http://localhost:8080/api/products';
  private categoriesBaseUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }
  
  getProductList(theCategoryId: number): Observable<Product[]> {
    if(theCategoryId == null){
      return this.httpClient.get<GetResponseProducts>(this.productsBaseUrl).pipe(
        map(response => response._embedded.products)
      )
    }
    const searchByIdUrl = `${this.productsBaseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get<GetResponseProducts>(searchByIdUrl).pipe(
      map(response => response._embedded.products)
    )
  }  

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoriesBaseUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}