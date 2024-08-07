import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number = 1;
  previuousCategoryId: number = 1;
  searchMode: boolean;
  // new properties for pagination
  thePageNumber: number;
  thePageSize: number = 10;
  theTotalElements: number = 0;
  previousKeyword: string = "";

  constructor(private productService: ProductService,
              private route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    })  
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProducts();
    } else{
      this.handleListProducts();
    }
  }

  handleListProducts(){

    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has("id");
    if(hasCategoryId){
      //get "id" parameter and converter into number
      this.currentCategoryId = +this.route.snapshot.paramMap.get("id")!;
    }
    
    if(this.previuousCategoryId != this.currentCategoryId){
        this.thePageNumber = 1;
    }

    this.previuousCategoryId = this.currentCategoryId;

    this.productService.getProductListPaginate(this.thePageNumber, this.thePageSize,this.currentCategoryId).subscribe(
      data => {
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;
      }
    )
  }

  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  handleSearchProducts(){
    const theKeyWord: string = this.route.snapshot.paramMap.get('keyword')!;

      if(this.previousKeyword != theKeyWord){
        this.thePageNumber = 1;
      }

      this.previousKeyword = theKeyWord;

      console.log(`keyword=${theKeyWord}, thePageNumber=${this.thePageNumber}`);

      this.productService.getSearchProductListPaginate(this.thePageNumber,this.thePageSize,theKeyWord).subscribe(
        this.processResult()
      );
  }

  processResult(): any {
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements; 
    }
  }

  addToCart(theProduct: Product){
    console.log(`adding to cart ${theProduct.name}, ${theProduct.unitPrice}`)
  }

}
