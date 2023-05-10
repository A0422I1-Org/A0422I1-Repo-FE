import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserViewMovieRoutingModule } from './user-view-movie-routing.module';
import {UserMoiveListComponent} from "./user-moive-list/user-moive-list.component";
import {UserMovieDetailComponent} from "./user-movie-detail/user-movie-detail.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        UserMoiveListComponent,
        UserMovieDetailComponent,
    ],
    exports: [
        UserMovieDetailComponent
    ],
  imports: [
    CommonModule,
    UserViewMovieRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserViewMovieModule { }
