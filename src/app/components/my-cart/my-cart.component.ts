import { Component, OnInit, NgZone } from '@angular/core';
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
  cartItems = [];
  cartItemsId = [];
  cartTotal = 0;
  orderItems = []
  BASE_URL: string = 'https://licorne-shop-api.herokuapp.com';
  
  error = null;

  constructor(
    private account: MyAccountService,
    private session: SessionService,
    private route: ActivatedRoute,
    private http: Http,
    private ngzone: NgZone
    ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      // this.account.getCart(this.localUser._id)
      //   .subscribe((theBehaviour) => {
      //   this.cartItems = theBehaviour.current_cart
      //   this.calculateTotal()
      // });
    })
  }

  getCartItemsId() {
      for (let i = 0; i < this.cartItems.length; i++) {
        let temp = this.cartItems[i]._id;
        this.cartItemsId.push(temp);
      }
    }

  calculateTotal() {
    this.cartTotal = 0;

    for (var i = 0; i < this.cartItems.length; i++) {
      this.cartTotal += this.cartItems[i].productId.price
    }
  }


  deleteItem(id){
      this.route.params.subscribe(params => {
        let productId = id;
        let userId = this.localUser._id;
        let index = this.cartItemsId.indexOf(productId);
        this.cartItems.splice(index, 1);
        this.calculateTotal();
        this.ngzone.run(() => {
        return this.http.put(`${this.BASE_URL}/my-cart/deleteItem`, {productId, userId} )
        .subscribe((res)=> {
              this.account.sendCartChanged();
            });
      })
    })
  }



  orderItemsObject() {
    for (var i =0; i < this.cartItems.length; i++) {
      let item = {
        productId: this.cartItems[i].productId._id,
        ordered_color: this.cartItems[i].ordered_color,
        ordered_size: this.cartItems[i].ordered_size
      }

      this.orderItems.push(item)
    }

      console.log(this.orderItems)
  }


  emptyCart(){
      this.route.params.subscribe(params => {
        this.cartItems = [];
        this.cartTotal = 0;
        this.ngzone.run(() => {})
      })
    }

  processOrder() {

    this.orderItemsObject()

    let userId = this.localUser._id;
    let orderItems = this.orderItems;
    let total = this.cartTotal;

    this.emptyCart()

    this.route.params.subscribe(params => {
      return this.http.post(`${this.BASE_URL}/my-cart/order`, {userId, orderItems, total} )
        .subscribe((res) => {

          console.log("res", res);
          
        })
    });


  }

}
