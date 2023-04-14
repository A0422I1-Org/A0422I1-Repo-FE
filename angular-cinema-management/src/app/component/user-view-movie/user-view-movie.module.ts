import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserViewMovieRoutingModule } from './user-view-movie-routing.module';
import {UserMoiveListComponent} from "./user-moive-list/user-moive-list.component";
import {UserMoiveDetailComponent} from "./user-moive-detail/user-moive-detail.component";


@NgModule({
  declarations: [
    UserMoiveListComponent,
    UserMoiveDetailComponent,
  ],
  imports: [
    CommonModule,
    UserViewMovieRoutingModule
  ]
})
export class UserViewMovieModule { }
