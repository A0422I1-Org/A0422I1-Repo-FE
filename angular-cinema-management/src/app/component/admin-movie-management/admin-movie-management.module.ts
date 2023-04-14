import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminMovieManagementRoutingModule } from './admin-movie-management-routing.module';
import {AdminMovieListComponent} from "./admin-movie-list/admin-movie-list.component";
import {AdminMovieCreateComponent} from "./admin-movie-create/admin-movie-create.component";
import {AdminMovieEditComponent} from "./admin-movie-edit/admin-movie-edit.component";


@NgModule({
  declarations: [
    AdminMovieListComponent,
    AdminMovieCreateComponent,
    AdminMovieEditComponent,
  ],
  imports: [
    CommonModule,
    AdminMovieManagementRoutingModule
  ]
})
export class AdminMovieManagementModule { }
