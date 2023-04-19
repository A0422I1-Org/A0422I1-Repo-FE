import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path : "booking" ,
    loadChildren:() => import('./component/user-booking-ticket/user-booking-ticket.module').then(module =>module.UserBookingTicketModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
