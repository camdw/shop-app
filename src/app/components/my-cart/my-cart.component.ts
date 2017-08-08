import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { MyAccountService } from '../../services/my-account.service';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

  localUser = JSON.parse(localStorage.getItem('user'));
  user = {};
  cart = [];
  BASE_URL: string = 'http://localhost:3000';
  
  error = null;

  constructor(
    private account: MyAccountService,
    private session: SessionService,
    private route: ActivatedRoute,
    private http: Http,
    ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.account.getCart(this.localUser._id)
        .subscribe((theBehaviour) => {
        this.cart = theBehaviour.current_cart
        console.log(this.cart)
      });
    })
  }

}
