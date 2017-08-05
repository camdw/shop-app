import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service'
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  productCategories;

  constructor(private productService: ProductsService,
              private sessionService: SessionService) { }

  user;

  ngOnInit() {
 
    this.user = JSON.parse(localStorage.getItem('user'));

    this.productService.getList()
      .subscribe((products) => {
        this.getProductCategories(products)
    });
  }

    getProductCategories(products) {
      let temp = [];
       for (let product of products) {
        if (temp.indexOf(product.category) == -1) {
          temp.push(product.category);
        }
      }
        this.productCategories = temp;
    };

    logout() {
      this.sessionService.logout()
      this.user = null;
   }

}