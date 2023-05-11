import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserViewMovieModule} from "./component/user-view-movie/user-view-movie.module";
import {UserMovieListComponent} from "./component/user-view-movie/user-movie-list/user-movie-list.component";

import {UserMovieDetailComponent} from "./component/user-view-movie/user-movie-detail/user-movie-detail.component";

const routes: Routes = [
  {
    path: "movie/list",
    component: UserMovieListComponent
  },
  {
    path: "",
    component: UserMovieListComponent
  },
  {
    path: "booking",
    loadChildren: () => import('./component/user-booking-ticket/user-booking-ticket.module').then(module => module.UserBookingTicketModule)
  },
  {
    path: "movie",
    loadChildren: () => import('./component/user-view-movie/user-view-movie.module').then(module => module.UserViewMovieModule)
  },
  {
    path : "promotion" ,
    loadChildren:() => import('./component/user-view-promotion/user-view-promotion.module').then(module =>module.UserViewPromotionModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
