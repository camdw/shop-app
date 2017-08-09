import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class MyAccountService {
  BASE_URL: string = 'http://localhost:3000';

  private subject = new Subject<any>();

  constructor(
    private http: Http,
    private route: ActivatedRoute,

  ) { }

getUser(id) {
  return this.http.get(`${this.BASE_URL}/my-account/${id}`)
      .map((res) => res.json());
  }

getBehaviour(id) {
  return this.http.get(`${this.BASE_URL}/my-account/${id}`)
      .map((res) => res.json());
  }

getCart(id) {
  return this.http.get(`${this.BASE_URL}/my-cart/${id}`)
      .map((res) => res.json());
  }

getUserOrders(id){
    return this.http.get(`${this.BASE_URL}/my-account/orders/${id}`)
      .map((res) => res.json());
      }

sendCartChanged() {
  this.subject.next({"changed": true});
}

getCartChanged(): Observable<any> {
  return this.subject.asObservable();
}



}
