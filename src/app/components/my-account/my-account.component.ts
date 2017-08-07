import { Component, OnInit } from '@angular/core';
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
  BASE_URL: string = 'http://localhost:3000';
  
  error = null;

  constructor(
    private account: MyAccountService,
    private session: SessionService,
    private route: ActivatedRoute,
    private http: Http
  ) { }

   ngOnInit() {



    this.route.params.subscribe(params => {
      this.account.getUser(this.localUser._id)
        .subscribe((theUser) => {
         this.user = theUser;
         this.favourites = theUser.favourite_products;
      
  });

  })

 }

    removeFavourite(id){
      this.route.params.subscribe(params => {
        let productId = id;
        let userId = this.localUser._id;
        let index = this.favourites.indexOf(productId);
        this.favourites.splice(index, 1);
        return this.http.put(`${this.BASE_URL}/products/removeFavourite`, {productId, userId} )
        .subscribe((res)=> (res))
      })
    }

}