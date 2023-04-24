import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserMovieDetailComponent} from "./user-movie-detail/user-movie-detail.component";


const routes: Routes = [
  {path: "detail/:id", component: UserMovieDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserViewMovieRoutingModule {
}
