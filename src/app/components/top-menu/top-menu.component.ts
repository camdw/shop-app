import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ProductsService } from '../../services/products.service'
import { SessionService } from '../../services/session.service';
import { MyAccountService } from '../../services/my-account.service';
import { NavService } from "../../services/navservice.service";

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  productCategories;
  cartChangedSubscription: Subscription;

  user;

  constructor(private product: ProductsService,
              private session: SessionService,
              private account: MyAccountService,
              private navservice: NavService
            ) {
  }

  
  cartItems = 0;

  ngOnInit() {
    
    this.navservice.event.subscribe((data) => {
      if (localStorage.getItem('user')) {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.getCartNumber();  
      }else{
        this.cartItems = 0;
      }
      
    })

    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

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