import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProductsService {
  BASE_URL: string = 'https://licorne-shop-api.herokuapp.com';

  constructor(private http: Http) { }

getList() {
    return this.http.get(`${this.BASE_URL}/products`)
      .map((res) => res.json());
  }

getProduct(id) {
  return this.http.get(`${this.BASE_URL}/products/${id}`)
      .map((res) => res.json());
  }

getCategory(category) {
  return this.http.get(`${this.BASE_URL}/category/${category}`)
      .map((res) => res.json());
  }
}


