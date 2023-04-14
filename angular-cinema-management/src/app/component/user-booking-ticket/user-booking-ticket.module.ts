import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserBookingTicketRoutingModule } from './user-booking-ticket-routing.module';
import {MovieAndShowtimeSelectionComponent} from "./movie-and-showtime-selection/movie-and-showtime-selection.component";
import {ChairSelectionComponent} from "./chair-selection/chair-selection.component";
import {BookingTicketConfirmationComponent} from "./booking-ticket-confirmation/booking-ticket-confirmation.component";
import {BookingTicketDetailComponent} from "./booking-ticket-detail/booking-ticket-detail.component";


@NgModule({
  declarations: [
    MovieAndShowtimeSelectionComponent,
    ChairSelectionComponent,
    BookingTicketConfirmationComponent,
    BookingTicketDetailComponent,
  ],
  imports: [
    CommonModule,
    UserBookingTicketRoutingModule
  ]
})
export class UserBookingTicketModule { }
