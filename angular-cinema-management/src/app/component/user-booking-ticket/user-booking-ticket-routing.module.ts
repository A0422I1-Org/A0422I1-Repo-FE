import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BookingTicketConfirmationComponent} from "./booking-ticket-confirmation/booking-ticket-confirmation.component";
import {BookingTicketDetailComponent} from "./booking-ticket-detail/booking-ticket-detail.component";


const routes: Routes = [
  {
    path: 'confirm-booking',
    component: BookingTicketConfirmationComponent
  },
  {
    path: 'payment-ticket',
    component: BookingTicketDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserBookingTicketRoutingModule { }
