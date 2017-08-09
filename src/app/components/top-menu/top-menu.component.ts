import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
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
  cartChangedSubscription: Subscription;

  constructor(private product: ProductsService,
              private session: SessionService,
              private account: MyAccountService) {
  }

  user = JSON.parse(localStorage.getItem('user'));
  cartItems = 0;

  ngOnInit() {
 
    this.product.getList()
      .subscribe((products) => {
        this.getProductCategories(products)
      });

    this.getCartNumber();
  
    this.cartChangedSubscription = this.account.getCartChanged()
      .subscribe((data) => {
        console.log("Got message", data);
        this.getCartNumber();
      });
  }

  ngOnDestroy() {
    this.cartChangedSubscription.unsubscribe;
  }

  getCartNumber() {
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