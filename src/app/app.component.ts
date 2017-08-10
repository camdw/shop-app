import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service'
import { SessionService } from './services/session.service'
import { MyAccountService } from './services/my-account.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FINAL PROJECT';
  user = {
    _id: "",
    firstname: "",
  };
  constructor(
    private session: SessionService,
    private productService: ProductsService,
    private account: MyAccountService
  ) { }

  ngOnInit() {
    
  }

  logout() {
    this.session.logout();
  }

}
