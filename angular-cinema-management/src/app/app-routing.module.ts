
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminStatisticalMovieComponent} from "./component/admin-statistical/admin-statistical-movie/admin-statistical-movie.component";
import {AuthGuardService} from "./service/security/auth-guard.service";



const routes: Routes = [
  {path: "movie-statistic", component: AdminStatisticalMovieComponent,canActivate: [AuthGuardService]},
  {
    path: "customer-management",canActivate: [AuthGuardService],
    loadChildren: () => import('./component/admin-customer-management/admin-customer-management.module').then(module => module.AdminCustomerManagementModule)
  },
  {
    path:"ticket_management",canActivate: [AuthGuardService],
    loadChildren:() => import ('./component/admin-ticket-management/admin-ticket-management.module').then(module => module.AdminTicketManagementModule)
  },
  {
    path:"employee_management",canActivate: [AuthGuardService],
    loadChildren:() => import ('./component/admin-employee-management/admin-employee-management.module').then(module => module.AdminEmployeeManagementModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
