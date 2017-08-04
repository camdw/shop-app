import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products;
  productSelectedColor;
  productCategories;

  constructor(private productService: ProductsService) { }

  ngOnInit() {

    this.productService.getList()
      .subscribe((products) => {
        this.products = products;
    });
   }


  clickedColor(code) {
      this.productSelectedColor = code;
      console.log(this.productSelectedColor)
    }

}
