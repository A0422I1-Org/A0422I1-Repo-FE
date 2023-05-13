import { Component, OnInit } from '@angular/core';
import {TicketService} from "../../../service/ticket/ticket.service";
import {Ticket} from "../../../model/ticket";
import {Customer} from "../../../model/customer";
import {CustomerService} from "../../../service/customer/customer.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {render} from "creditcardpayments/creditCardPayments";
import {Room} from "../../../model/room";
import {TokenStorageService} from "../../../service/token/token-storage.service";
import {SecurityService} from "../../../service/security/security.service";

@Component({
  selector: 'app-booking-ticket-confirmation',
  templateUrl: './booking-ticket-confirmation.component.html',
  styleUrls: ['./booking-ticket-confirmation.component.css']
})
export class BookingTicketConfirmationComponent implements OnInit {
  tickets: Ticket[] = [];
  customer: Customer;
  totalMoney = 0;
  ticketDefault: Ticket;
  constructor(private ticketService: TicketService,
              private customerService: CustomerService,
              private toast: ToastrService,
              private router: Router,
              private token: TokenStorageService,
              private security: SecurityService) { }

  ngOnInit(): void {
    this.ticketService.getListSeatChoosing.subscribe(next => {
      this.tickets = next;
      console.log(this.tickets)
      for (let ticket of this.tickets) {
        this.totalMoney = this.totalMoney + ticket.price;
      }
      this.ticketDefault = this.tickets[0];
      console.log(this.ticketDefault)
    })


    this.customerService.findByUsername(this.token.getUser().username).subscribe(next => {
      this.customer = next;
      console.log(next)
    })
  }

  showDetailAndPaymentPage() {
    this.toast.success("Đã xác nhận thông tin. Vui lòng thanh toán để hoàn tất quá trình đặt vé !")
    this.router.navigateByUrl("/user/payment-ticket");
  }

  goBack() {
    this.router.navigateByUrl("booking/select-seat?showTimeId=" + this.ticketDefault.showTime.id);
  }
}
