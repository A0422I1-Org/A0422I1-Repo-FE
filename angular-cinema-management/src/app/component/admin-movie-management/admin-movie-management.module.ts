import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminMovieManagementRoutingModule } from './admin-movie-management-routing.module';
import {AdminMovieListComponent} from "./admin-movie-list/admin-movie-list.component";
import {AdminMovieCreateComponent} from "./admin-movie-create/admin-movie-create.component";
import {AdminMovieEditComponent} from "./admin-movie-edit/admin-movie-edit.component";
import { MovieComponent } from './movie.component';


@NgModule({
  declarations: [
    AdminMovieListComponent,
    AdminMovieCreateComponent,
    AdminMovieEditComponent,
    MovieComponent,
  ],
  imports: [
    CommonModule,
    AdminMovieManagementRoutingModule
  ]
})
export class AdminMovieManagementModule { }
