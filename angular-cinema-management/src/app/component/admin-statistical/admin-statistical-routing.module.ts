import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminStatisticalMovieTypeComponent} from "./admin-statistical-movie-type/admin-statistical-movie-type.component";
import {AdminStatisticalShowtimeComponent} from "./admin-statistical-showtime/admin-statistical-showtime.component";


const routes: Routes = [
  {component : AdminStatisticalMovieTypeComponent, path : "movie-type-statistic"},
  {component : AdminStatisticalShowtimeComponent, path : "showtime-statistic"},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminStatisticalRoutingModule { }
