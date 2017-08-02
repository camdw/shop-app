import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProductsService {
  BASE_URL: string = 'http://localhost:3000';

  constructor(private http: Http) { }

getList() {
    return this.http.get(`${this.BASE_URL}/products`)
      .map((res) => res.json());
  }

}
