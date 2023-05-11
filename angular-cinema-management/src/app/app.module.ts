import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {UserViewPromotionModule} from "src/app/component/user-view-promotion/user-view-promotion.module";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './component/login/login.component';
import {RegisterComponent} from './component/register/register.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UserViewMovieModule} from "./component/user-view-movie/user-view-movie.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UserViewMovieModule,
  UserViewPromotionModule,

],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
