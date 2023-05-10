import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserMovieDetailComponent} from "./user-movie-detail/user-movie-detail.component";
import {UserMoiveListComponent} from "./user-moive-list/user-moive-list.component";


const routes: Routes = [
  {path: "detail/:id", component: UserMovieDetailComponent},
  {path: "list", component: UserMoiveListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserViewMovieRoutingModule {
}
