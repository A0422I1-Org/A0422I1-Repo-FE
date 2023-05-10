import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminStatisticalMovieComponent} from "./admin-statistical-movie/admin-statistical-movie.component";
import {AdminStatisticalCustomerComponent} from "./admin-statistical-customer/admin-statistical-customer.component";


const routes: Routes = [
  {path: 'statistic/statistic-movie', component: AdminStatisticalMovieComponent},
  {path: 'statistic/statistic-customer', component: AdminStatisticalCustomerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminStatisticalRoutingModule { }
