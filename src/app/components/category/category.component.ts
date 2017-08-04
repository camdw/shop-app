import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})


export class CategoryComponent implements OnInit {

products = []

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService) { }

  ngOnInit() {

      this.route.params.subscribe(params => {
        this.productService.getCategory(params['category'])
          .subscribe((products) => {
          this.products = products;
      });
  });
}


}
