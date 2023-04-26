import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserMovieDetailComponent} from "./component/user-view-movie/user-movie-detail/user-movie-detail.component";


const routes: Routes = [
  {
    path: "booking",
    loadChildren: () => import('./component/user-booking-ticket/user-booking-ticket.module').then(module => module.UserBookingTicketModule)
  },
  {
    path: "movie",
    loadChildren: () => import('./component/user-view-movie/user-view-movie.module').then(module => module.UserViewMovieModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
