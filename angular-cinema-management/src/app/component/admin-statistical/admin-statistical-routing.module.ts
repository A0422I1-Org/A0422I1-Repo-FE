import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AdminStatisticalMovieTypeComponent} from "./admin-statistical-movie-type/admin-statistical-movie-type.component";
import {AdminStatisticalShowtimeComponent} from "./admin-statistical-showtime/admin-statistical-showtime.component";
import {AdminStatisticalCustomerComponent} from "./admin-statistical-customer/admin-statistical-customer.component";
import {AdminStatisticalMovieComponent} from "./admin-statistical-movie/admin-statistical-movie.component";
import {AuthGuardService} from "../../service/security/auth-guard.service";


const routes: Routes = [
  {component : AdminStatisticalMovieTypeComponent, path : "statistic/movie-type-statistic", canActivate: [AuthGuardService]},
  {component : AdminStatisticalShowtimeComponent, path : "statistic/showtime-statistic", canActivate: [AuthGuardService]},
  {path: 'statistic/statistic-movie', component: AdminStatisticalMovieComponent, canActivate: [AuthGuardService]},
  {path: 'statistic/statistic-customer', component: AdminStatisticalCustomerComponent, canActivate: [AuthGuardService]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminStatisticalRoutingModule { }
