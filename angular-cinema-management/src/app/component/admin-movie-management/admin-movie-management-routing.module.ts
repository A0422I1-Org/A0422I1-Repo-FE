import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MovieComponent} from "./movie.component";
import {AdminMovieListComponent} from "./admin-movie-list/admin-movie-list.component";
import {AuthGuardService} from "../../service/security/auth-guard.service";


const routes: Routes = [
  {
    path: 'movie', component: MovieComponent,canActivate: [AuthGuardService], children: [
      {path: '', component: AdminMovieListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminMovieManagementRoutingModule { }
