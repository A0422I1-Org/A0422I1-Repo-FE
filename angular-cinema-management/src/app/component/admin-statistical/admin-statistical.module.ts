import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminStatisticalRoutingModule} from './admin-statistical-routing.module';
import {AdminStatisticalMovieComponent} from "./admin-statistical-movie/admin-statistical-movie.component";
import {AdminStatisticalCustomerComponent} from "./admin-statistical-customer/admin-statistical-customer.component";
import {AdminStatisticalMovieTypeComponent} from "./admin-statistical-movie-type/admin-statistical-movie-type.component";
import {AdminStatisticalShowtimeComponent} from "./admin-statistical-showtime/admin-statistical-showtime.component";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {HeaderAdminModule} from "../header/header-admin/header-admin.module";
import {SlidebarModule} from "../slidebar/slidebar.module";


@NgModule({
  declarations: [
    AdminStatisticalMovieComponent,
    AdminStatisticalCustomerComponent,
    AdminStatisticalMovieTypeComponent,
    AdminStatisticalShowtimeComponent
  ],
  exports: [
    AdminStatisticalMovieTypeComponent
  ],
  imports: [
    CommonModule,
    AdminStatisticalRoutingModule,
    FormsModule,
    NgxPaginationModule,
    HeaderAdminModule,
    SlidebarModule
  ]
})
export class AdminStatisticalModule {
}
