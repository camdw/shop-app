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

   constructor(
    private route: ActivatedRoute,
    private productService: ProductsService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.getProductDetails(params['id']);
    });
  }

  getProductDetails(id) {
    this.productService.getProduct(id)
      .subscribe((theProduct) => {
        this.product = theProduct;
      });
  }
}
