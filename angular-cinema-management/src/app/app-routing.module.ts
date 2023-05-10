import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminStatisticalMovieComponent} from "./component/admin-statistical/admin-statistical-movie/admin-statistical-movie.component";


const routes: Routes = [
  {path: "", component: AdminStatisticalMovieComponent},
  {path: "ticket_management",
    loadChildren: () => import ('./component/admin-ticket-management/admin-ticket-management.module').then(module => module.AdminTicketManagementModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
