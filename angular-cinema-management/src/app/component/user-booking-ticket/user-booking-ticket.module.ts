import { NgModule } from '@angular/core';


import {MovieAndShowtimeSelectionComponent} from "./movie-and-showtime-selection/movie-and-showtime-selection.component";
import {ChairSelectionComponent} from "./chair-selection/chair-selection.component";
import {BookingTicketConfirmationComponent} from "./booking-ticket-confirmation/booking-ticket-confirmation.component";
import {BookingTicketDetailComponent} from "./booking-ticket-detail/booking-ticket-detail.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule, registerLocaleData} from "@angular/common";
import {UserBookingTicketRoutingModule} from "./user-booking-ticket-routing.module";
import localeVi from '@angular/common/locales/vi';
import {HeaderModule} from "../header/header.module";
import {FooterModule} from "../footer/footer.module";


@NgModule({
  declarations: [
    MovieAndShowtimeSelectionComponent,
    ChairSelectionComponent,
    BookingTicketConfirmationComponent,
    BookingTicketDetailComponent,
  ],
    imports: [
        CommonModule,
        UserBookingTicketRoutingModule,
        ReactiveFormsModule,
      HeaderModule,
      FooterModule
    ]
})
export class UserBookingTicketModule {
  constructor() {
    registerLocaleData(localeVi, 'vi');
  }
}
