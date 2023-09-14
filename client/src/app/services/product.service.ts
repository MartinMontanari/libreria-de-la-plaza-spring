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

    return this.searchProducts(searchByIdUrl);
  }  

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoriesBaseUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  searchProductsByKeyword(keyword: string): Observable<Product[]>{
    const searchProductByKeywordBaseUrl = `${this.productsBaseUrl}/search/findByNameContaining?name=${keyword}`;
    return this.searchProducts(searchProductByKeywordBaseUrl);
  }

  searchProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProduct(theProductId: number): Observable<Product>{
    const productDetailBaseUrl = `${this.productsBaseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productDetailBaseUrl);
  }

  getProductListPaginate(thePage: number, thePageSize: number, theCategoryId: number): Observable<GetResponseProducts> {
    const searchUrl = `${this.productsBaseUrl}/search/findByCategoryId?id=${theCategoryId}&page=${thePage}&size=${thePageSize}`;
    
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

}



interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}