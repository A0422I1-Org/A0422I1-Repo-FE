import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserMovieListComponent} from "./component/user-view-movie/user-movie-list/user-movie-list.component";

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
    path: "movie",
    loadChildren: () => import('./component/user-view-movie/user-view-movie.module').then(module => module.UserViewMovieModule)
  },
  {
    path: "promotion",
    loadChildren: () => import('./component/user-view-promotion/user-view-promotion.module').then(module => module.UserViewPromotionModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./component/user-booking-ticket/user-booking-ticket.module').then(module => module.UserBookingTicketModule)
  },
  {
    path: "booking",
    loadChildren: () => import('./component/user-booking-ticket/user-booking-ticket.module').then(module => module.UserBookingTicketModule)
  },
  {
    path : "customer" ,
    loadChildren:() => import('./component/user-account-management/user-account-management.module').then(module =>module.UserAccountManagementModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
