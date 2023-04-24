import { Component, OnInit } from '@angular/core';
import {Ticket} from "../../../model/ticket";
import {Customer} from "../../../model/customer";
import {TicketService} from "../../../service/ticket/ticket.service";
import {CustomerService} from "../../../service/customer/customer.service";
import {ToastrService} from "ngx-toastr";
import {render} from "creditcardpayments/creditCardPayments";

@Component({
  selector: 'app-booking-ticket-detail',
  templateUrl: './booking-ticket-detail.component.html',
  styleUrls: ['./booking-ticket-detail.component.css']
})
export class BookingTicketDetailComponent implements OnInit {
  tickets: Ticket[] = [];
  customer: Customer;
  totalMoney = 0;
  vndMoney = '';
  ticketDefault: Ticket;
  constructor(private ticketService: TicketService,
              private customerService: CustomerService,
              private toast: ToastrService) {

  }

  ngOnInit(): void {
    this.ticketService.findTicketsChoosed().subscribe(next => {
      this.tickets = next;
      for (let ticket of this.tickets) {
        this.totalMoney = this.totalMoney + 40000;
      }
      this.ticketDefault = this.tickets[0];
      this.vndMoney = (this.totalMoney / 23000).toFixed();
      console.log(this.vndMoney)
      render({
        id: "#myPaypalButtons",
        currency: "VND",
        value: this.vndMoney,
        onApprove: (details) => {
          this.confirmTicket();
          this.toast.success("Đặt vé thành công !!!");
        }
      });
    })

    this.customerService.findById('KH-002').subscribe(next => {
      this.customer = next;
    })
  }

  confirmTicket() {
    for (let ticket of this.tickets) {
      console.log(ticket);
      this.ticketService.confirmTicket(ticket).subscribe(next => {
        console.log("OK");
      });
    }
  }

}
