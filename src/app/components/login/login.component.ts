import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

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
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    this.session.login(this.user).subscribe(
      (data) => {
        this.router.navigate(['/']);
      },
      (err) => {
        this.error = err;
      });
  }
}
