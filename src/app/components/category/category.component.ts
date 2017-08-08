import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})


export class CategoryComponent implements OnInit {

products = []
user = JSON.parse(localStorage.getItem('user'));
BASE_URL: string = 'http://localhost:3000';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private http: Http) { }

  ngOnInit() {

      this.route.params.subscribe(params => {
        this.productService.getCategory(params['category'])
          .subscribe((products) => {
          this.products = products;
      });
  });
}

  addFavourite(productId){
    this.route.params.subscribe(params => {
      let userId = this.user._id;
      return this.http.put(`${this.BASE_URL}/products/addFavourite`, {productId, userId} )
        .subscribe((res)=> (res))
    })
  }

}
