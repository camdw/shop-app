import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service'
import { SessionService } from '../../services/session.service';
import { MyAccountService } from '../../services/my-account.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  productCategories;

  constructor(private product: ProductsService,
              private session: SessionService,
              private account: MyAccountService) { }

  user = JSON.parse(localStorage.getItem('user'));
  cartItems = 0;

  ngOnInit() {
 
    this.product.getList()
      .subscribe((products) => {
        this.getProductCategories(products)
      });

    this.account.getCart(this.user._id)
      .subscribe((theBehaviour) => {
        this.cartItems = theBehaviour.current_cart.length
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
      this.session.logout()
      this.user = null;
   }

}