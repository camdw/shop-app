import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})


export class SideMenuComponent implements OnInit {

products = []

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService) { }

  ngOnInit() {

      this.route.params.subscribe(params => {
        this.productService.getCategory(params['category'])
          .subscribe((products) => {
          this.products = products;
      });
  });
}


}
