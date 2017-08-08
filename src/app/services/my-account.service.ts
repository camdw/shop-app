import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class MyAccountService {
    BASE_URL: string = 'http://localhost:3000';

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
}


