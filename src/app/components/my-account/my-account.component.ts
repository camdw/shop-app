import { Component, OnInit, NgZone } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { MyAccountService } from '../../services/my-account.service';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  localUser = JSON.parse(localStorage.getItem('user'));
  user = {};
  favourites = [];
  favouritesId = [];
  orders = []
  visible;
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

    this.visible = 'favourites';

    this.route.params.subscribe(params => {
      this.account.getBehaviour(this.localUser._id)
        .subscribe((theBehaviour) => {
         this.favourites = theBehaviour.favourite_products;
         this.getFavouritesId();
      });
    })
 }

    getFavouritesId() {
      for (let i = 0; i < this.favourites.length; i++) {
        let temp = this.favourites[i]._id;
        this.favouritesId.push(temp);
      }
    }

    removeFavourite(id){
      this.route.params.subscribe(params => {
        let productId = id;
        let userId = this.localUser._id;
        let index = this.favouritesId.indexOf(productId);
        this.favourites.splice(index, 1);
        this.ngzone.run(() => {
        return this.http.put(`${this.BASE_URL}/products/removeFavourite`, {productId, userId} )
        .subscribe((res)=> (res))
        })
      })
    }

    getOrders(id) {
      this.account.getUserOrders(id)
        .subscribe((orders) => {
          this.orders = orders;
          console.log(orders)
      });
    }

    viewOrders(id) {
      this.route.params.subscribe(params => {
        this.account.getUserOrders(id)
        .subscribe((orders) => {
          this.orders = orders;
          this.visible = 'orders';
          console.log(this.orders)
        })
      })
    }

    viewFavourites() {
      this.visible = 'favourites';
    }

}