import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminStatisticalMovieComponent} from "./component/admin-statistical/admin-statistical-movie/admin-statistical-movie.component";
import {AdminStatisticalCustomerComponent} from "./component/admin-statistical/admin-statistical-customer/admin-statistical-customer.component";


const routes: Routes = [
  {path: '', component: AdminStatisticalMovieComponent},
  {path: 'statistic/movie', component: AdminStatisticalMovieComponent},
  {path: 'statistic/member', component: AdminStatisticalCustomerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
