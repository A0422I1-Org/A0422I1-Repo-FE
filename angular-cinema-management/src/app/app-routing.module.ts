import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserMoiveListComponent} from "./component/user-view-movie/user-moive-list/user-moive-list.component";


const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./component/user-booking-ticket/user-booking-ticket.module').then(module => module.UserBookingTicketModule)
  },
  {
    path: '',
    component: UserMoiveListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
