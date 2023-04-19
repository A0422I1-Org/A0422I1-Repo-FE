import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MovieAndShowtimeSelectionComponent} from "./movie-and-showtime-selection/movie-and-showtime-selection.component";


const routes: Routes = [
  {
    path:'select-movie-and-showtime' ,component: MovieAndShowtimeSelectionComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserBookingTicketRoutingModule { }
