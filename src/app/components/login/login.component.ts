import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import {Location} from '@angular/common';
import { NavService } from "../../services/navservice.service"


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  user: Object = {
		email: '',
		password: '',
  }
  
  error = null;

  constructor(
    private session: SessionService,
    private router: Router,
    private _location: Location,
    private navservice: NavService,
  ) { }

  ngOnInit() {
  }

  login() {
    this.session.login(this.user).subscribe(
      (data) => {
        this.navservice.publish("");
        this._location.back();
        
      },
      (err) => {
        this.error = err;
      });
  }
}
