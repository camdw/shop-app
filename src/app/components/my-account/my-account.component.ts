import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { MyAccountService } from '../../services/my-account.service';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('user'))
  
  error = null;

  constructor(
    private account: MyAccountService,
    private session: SessionService,
    private route: ActivatedRoute,
  ) { }

   ngOnInit() {

    this.route.params.subscribe(params => {
      this.getUserDetails(this.user._id);
  });
}

  getUserDetails(id) {
    this.account.getUser(id)
      .subscribe((theUser) => {
        this.user = theUser;
        console.log(this.user)
      });
  }

}