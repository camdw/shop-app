import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router, CanActivate } from '@angular/router';
import { NavService } from './navservice.service';

@Injectable()
export class SessionService implements CanActivate {
  BASE_URL: string = 'https://licorne-shop-api.herokuapp.com';

  public user = {};
  public token = '';
  public isAuthenticated = false;
  cartItems = 0;

  constructor(
    private http: Http,
    private router: Router,
    private navservice: NavService
  ) { }

  handleError(e) {
    
    this.logout();
    this.router.navigate(['/login']);
    return Observable.throw(e.json().message);
  }

  canActivate(): Observable<boolean> | boolean {
    let token = localStorage.getItem('token');

    if (token) {
      let headers = new Headers({ 'Authorization': `JWT ${token}` });
      let options = new RequestOptions({ headers: headers });

      return this.http.get(`${this.BASE_URL}/ping`, options)
        .map((data) => {
          
          if (data) {
            
            this.isAuthenticated = true;
            this.token = token;
            this.user = JSON.parse(localStorage.getItem('user'))
            return true;
          }
          return false;
        })
        .catch(this.handleError);
    }
    else {
      this.logout();
      console.log(this.router.url)
      this.router.navigate(['/login']);
      return false;
    }
  }

  login(user) {
    return this.http.post(`${this.BASE_URL}/login`, user)
      .map(res => {
        let json = res.json();
        let token = json.token;
        let user = json.user;

        if (token) {
          this.token = token;
          this.user = {
            _id: user._id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname
          }
          this.isAuthenticated = true;
          localStorage.setItem('token', this.token);
          localStorage.setItem('user', JSON.stringify(this.user))
        }
        
        // return this.isAuthenticated;

      }).catch(this.handleError);
  }

  logout() {
    this.token = '';
    this.user = {}
    this.isAuthenticated = false;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    this.navservice.publish("");        
    this.router.navigate(['/login'])
  }

  signup(user) {
    return this.http.post(`${this.BASE_URL}/signup`, user)
      .map(res => {
        let json = res.json();
        let token = json.token;
        this.user = json.user;
        this.token = token;

        this.isAuthenticated = true;
        localStorage.setItem('token', this.token);
        localStorage.setItem('user', JSON.stringify(this.user))
      

        return this.isAuthenticated;

      }).catch(this.handleError);
  }

  behaviour(id) {
    return this.http.post(`${this.BASE_URL}/behaviour`, id)
      .map((res) => res.json())
    }

}


