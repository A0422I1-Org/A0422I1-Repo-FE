import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {UserViewPromotionModule} from "src/app/component/user-view-promotion/user-view-promotion.module";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterComponent} from './component/register/register.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UserViewMovieModule} from "./component/user-view-movie/user-view-movie.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {SecurityModule} from "./component/security/security.module";
import {ToastrModule} from "ngx-toastr";


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UserViewMovieModule,
    UserViewPromotionModule,
    ReactiveFormsModule,
    SecurityModule,
    ToastrModule.forRoot(
      {
        timeOut: 2000,
        positionClass: 'toast-top-right'
      }
    )
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
