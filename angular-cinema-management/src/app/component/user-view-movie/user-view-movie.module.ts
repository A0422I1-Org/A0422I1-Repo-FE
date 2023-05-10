import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserViewMovieRoutingModule } from './user-view-movie-routing.module';
import {UserMoiveListComponent} from "./user-moive-list/user-moive-list.component";
import {UserMoiveDetailComponent} from "./user-moive-detail/user-moive-detail.component";
import {AppModule} from "../../app.module";


@NgModule({
  declarations: [
    UserMoiveListComponent,
    UserMoiveDetailComponent,
  ],
    imports: [
        CommonModule,
        UserViewMovieRoutingModule,
        AppModule
    ]
})
export class UserViewMovieModule { }
