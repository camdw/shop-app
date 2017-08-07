import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { routes } from './app.routing';

import { ProductsService } from './services/products.service';
import { SessionService } from './services/session.service';
import { MyAccountService } from './services/my-account.service'

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { CategoryComponent } from './components/category/category.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MyAccountComponent } from './components/my-account/my-account.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailsComponent,
    TopMenuComponent,
    CategoryComponent,
    LoginComponent,
    SignupComponent,
    MyAccountComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpModule,
    FormsModule,
  ],
  providers: [ProductsService, SessionService, MyAccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
