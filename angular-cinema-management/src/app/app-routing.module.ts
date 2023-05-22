import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserMovieListComponent} from "./component/user-view-movie/user-movie-list/user-movie-list.component";
import {AdminStatisticalMovieComponent} from "./component/admin-statistical/admin-statistical-movie/admin-statistical-movie.component";
import {AuthGuardService} from "./service/security/auth-guard.service";
const routes: Routes = [
  {
    path: "movie/list",
    component: UserMovieListComponent
  },
  {
    path: "",
    component: UserMovieListComponent
  },
  {
    path: "movie",
    loadChildren: () => import('./component/user-view-movie/user-view-movie.module').then(module => module.UserViewMovieModule)
  },
  {
    path: "promotion",
    loadChildren: () => import('./component/user-view-promotion/user-view-promotion.module').then(module => module.UserViewPromotionModule)
  },
  {
    path: 'user', canActivate: [AuthGuardService],
    loadChildren: () => import('./component/user-booking-ticket/user-booking-ticket.module').then(module => module.UserBookingTicketModule)
  },
  {
    path: "booking", canActivate: [AuthGuardService],
    loadChildren: () => import('./component/user-booking-ticket/user-booking-ticket.module').then(module => module.UserBookingTicketModule)
  },
  {
    path : "customer", canActivate: [AuthGuardService],
    loadChildren:() => import('./component/user-account-management/user-account-management.module').then(module =>module.UserAccountManagementModule)
  },
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
