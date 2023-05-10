import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserViewMovieModule} from "./component/user-view-movie/user-view-movie.module";
import {UserMoiveListComponent} from "./component/user-view-movie/user-moive-list/user-moive-list.component";


const routes: Routes = [
  {
    path: "movie/list",
    component: UserMoiveListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
