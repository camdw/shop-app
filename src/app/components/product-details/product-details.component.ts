import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product;
  productSelectedColor;
  productColors = [];
  productSizes;

   constructor(
    private route: ActivatedRoute,
    private productService: ProductsService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.getProductDetails(params['id']);
      this.getProductColors(params['id'])      
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

}
