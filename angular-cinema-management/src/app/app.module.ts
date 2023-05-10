import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './component/login/login.component';
import {RegisterComponent} from './component/register/register.component';
import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxPaginationModule} from "ngx-pagination";
import {AdminMovieManagementModule} from "./component/admin-movie-management/admin-movie-management.module";
import {ToastrModule} from "ngx-toastr";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminStatisticalModule} from "./component/admin-statistical/admin-statistical.module";
import {AdminStatisticalRoutingModule} from "./component/admin-statistical/admin-statistical-routing.module";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    AdminMovieManagementModule,
    AdminStatisticalModule,
    AdminStatisticalRoutingModule,
    ToastrModule.forRoot(({
      positionClass: 'toast-top-right',
    })),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
