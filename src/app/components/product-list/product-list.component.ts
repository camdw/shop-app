import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { ProductsService } from '../../services/products.service';
import { MyAccountService} from '../../services/my-account.service'
import { SessionService } from '../../services/session.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products;
  productSelectedColor;
  productCategories;
  user = JSON.parse(localStorage.getItem('user'));

  BASE_URL: string = 'https://licorne-shop-api.herokuapp.com';


  constructor(private productService: ProductsService,
              private account: MyAccountService,
              private session: SessionService,
              private route: ActivatedRoute,
              private http: Http ) { }

  ngOnInit() {

    this.productService.getList()
      .subscribe((products) => {
        this.products = products;
    });

   }


  clickedColor(code) {
    this.productSelectedColor = code;
  }

  addFavourite(productId){
    this.route.params.subscribe(params => {
      let userId = this.user._id;
      return this.http.put(`${this.BASE_URL}/products/addFavourite`, {productId, userId} )
        .subscribe((res)=> (res))
    })

    document.getElementById('added').innerHTML = 'Product added to Favourites';

  }
}
