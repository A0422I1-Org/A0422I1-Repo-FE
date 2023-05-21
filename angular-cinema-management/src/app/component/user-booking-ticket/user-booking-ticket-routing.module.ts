import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BookingTicketConfirmationComponent} from "./booking-ticket-confirmation/booking-ticket-confirmation.component";
import {BookingTicketDetailComponent} from "./booking-ticket-detail/booking-ticket-detail.component";
import {MovieAndShowtimeSelectionComponent} from "./movie-and-showtime-selection/movie-and-showtime-selection.component";
import {ChairSelectionComponent} from "./chair-selection/chair-selection.component";


const routes: Routes = [
  {
    path: 'confirm-booking',
    component: BookingTicketConfirmationComponent
  },
  {
    path: 'payment-ticket',
    component: BookingTicketDetailComponent
  },
  {
    path:'select-seat',component: ChairSelectionComponent
  },
  {
    path:'select-movie-and-showtime' ,component: MovieAndShowtimeSelectionComponent
  }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserBookingTicketRoutingModule { }
