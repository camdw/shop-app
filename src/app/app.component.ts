import { Component } from '@angular/core';
import { ProductsService } from './services/products.service'
import { SessionService } from './services/session.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FINAL PROJECT';

  constructor(
    private session: SessionService,
    private productService: ProductsService
  ) { }

  logout() {
    this.session.logout();
  }

}
