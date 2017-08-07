import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { SessionService } from '../../services/session.service'
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product;
  productColors = [];
  productSizes;
  productSelectedColor;
  productSelectedSize;
  user = JSON.parse(localStorage.getItem('user'));
  BASE_URL: string = 'http://localhost:3000';


   constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private session: SessionService,
    private http: Http) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.getProductDetails(params['id']);
      this.getProductColors(params['id']);
      this.getProductSizes(params['id']);   
    });
  }

  getProductDetails(id) {
    this.productService.getProduct(id)
      .subscribe((theProduct) => {
        this.product = theProduct;
        this.productSelectedColor = theProduct.color[0].code;     
      });
  }

  getProductColors(id) {
    this.productService.getProduct(id)
      .subscribe((theProduct) => {
        let temp = [];
      for (let color of theProduct.color) {
        temp.push(color.code);
      }
        this.productColors = temp;
  });
  }

    getProductSizes(id) {
    this.productService.getProduct(id)
      .subscribe((theProduct) => {
        let temp = [];
      for (let size of theProduct.size) {
        temp.push(size);
      }
        this.productSizes = temp;
  });
  }

    clickedColor(code, i) {
      this.productSelectedColor = code;
      document.getElementById(i).classList.add("selected")
    }

    clickedSize(size) {
      this.productSelectedSize = size;
      console.log(this.productSelectedSize)
    }

    addFavourite(){
      this.route.params.subscribe(params => {
        console.log(params)
        // let productId = params["id"];
        // let userId = this.user._id;
        // return this.http.put(`${this.BASE_URL}/products/addFavourite`, {productId, userId} )
        // .subscribe((res)=> (res))
      })
    }
}
