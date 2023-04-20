import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminStatisticalRoutingModule } from './admin-statistical-routing.module';
import {AdminStatisticalMovieComponent} from "./admin-statistical-movie/admin-statistical-movie.component";
import {AdminStatisticalCustomerComponent} from "./admin-statistical-customer/admin-statistical-customer.component";
import {AdminStatisticalMovieTypeComponent} from "./admin-statistical-movie-type/admin-statistical-movie-type.component";
import {AdminStatisticalShowtimeComponent} from "./admin-statistical-showtime/admin-statistical-showtime.component";


@NgModule({
  declarations: [
    AdminStatisticalMovieComponent,
    AdminStatisticalCustomerComponent,
    AdminStatisticalMovieTypeComponent,
    AdminStatisticalShowtimeComponent
  ],
  exports: [
    AdminStatisticalMovieComponent
  ],
  imports: [
    CommonModule,
    AdminStatisticalRoutingModule
  ]
})
export class AdminStatisticalModule { }
