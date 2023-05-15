import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserViewMovieRoutingModule} from './user-view-movie-routing.module';
import {UserMovieListComponent} from "./user-movie-list/user-movie-list.component";
import {UserMovieDetailComponent} from "./user-movie-detail/user-movie-detail.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HeaderCommonModule} from "../header/header-common/header-common.module";
import {FooterModule} from "../footer/footer.module";

@NgModule({
  declarations: [
    UserMovieListComponent,
    UserMovieDetailComponent,
  ],
  exports: [
    UserMovieDetailComponent
  ],
  imports: [
    CommonModule,
    UserViewMovieRoutingModule,
    ReactiveFormsModule,
    HeaderCommonModule,
    FooterModule
  ]
})
export class UserViewMovieModule {
}
