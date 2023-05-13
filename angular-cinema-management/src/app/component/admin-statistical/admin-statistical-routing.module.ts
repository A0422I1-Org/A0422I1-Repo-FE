import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AdminStatisticalMovieTypeComponent} from "./admin-statistical-movie-type/admin-statistical-movie-type.component";
import {AdminStatisticalShowtimeComponent} from "./admin-statistical-showtime/admin-statistical-showtime.component";
import {AdminStatisticalCustomerComponent} from "./admin-statistical-customer/admin-statistical-customer.component";
import {AdminStatisticalMovieComponent} from "./admin-statistical-movie/admin-statistical-movie.component";


const routes: Routes = [
  {component : AdminStatisticalMovieTypeComponent, path : "statistic/movie-type-statistic"},
  {component : AdminStatisticalShowtimeComponent, path : "statistic/showtime-statistic"},
  {path: 'statistic/statistic-movie', component: AdminStatisticalMovieComponent},
  {path: 'statistic/statistic-customer', component: AdminStatisticalCustomerComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminStatisticalRoutingModule { }
