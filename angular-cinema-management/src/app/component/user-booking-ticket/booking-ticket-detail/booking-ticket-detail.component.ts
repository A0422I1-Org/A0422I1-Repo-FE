import { Component, OnInit } from '@angular/core';
import {Ticket} from "../../../model/ticket";
import {Customer} from "../../../model/customer";
import {TicketService} from "../../../service/ticket/ticket.service";
import {CustomerService} from "../../../service/customer/customer.service";
import {ToastrService} from "ngx-toastr";
import {render} from "creditcardpayments/creditCardPayments";
import {TokenStorageService} from "../../../service/token/token-storage.service";
import {Router} from "@angular/router";
import {PointService} from "../../../service/point/point.service";

@Component({
  selector: 'app-booking-ticket-detail',
  templateUrl: './booking-ticket-detail.component.html',
  styleUrls: ['./booking-ticket-detail.component.css']
})
export class BookingTicketDetailComponent implements OnInit {
  tickets: Ticket[] = [];
  customer: Customer;
  totalMoney = 0;
  usdMoney = '';
  ticketDefault: Ticket;
  constructor(private ticketService: TicketService,
              private customerService: CustomerService,
              private toast: ToastrService,
              private token: TokenStorageService,
              private router: Router,
              private pointService: PointService) {

  }

  ngOnInit(): void {
    this.ticketService.getListSeatChoosing.subscribe(next => {
      this.tickets = next;
      for (let ticket of this.tickets) {
        this.totalMoney = this.totalMoney + ticket.price;
      }
      this.ticketDefault = this.tickets[0];
      this.usdMoney = (this.totalMoney / 23460.000).toFixed(2);
      this.usdMoney = (this.totalMoney / 23460).toFixed(2);
      console.log(this.usdMoney)
      render({
        id: "#myPaypalButtons",
        currency: "VND",
        value: this.usdMoney,
        onApprove: (details) => {
          this.confirmTicket();
          this.router.navigate(["/customer/ticket"])
        }
      });
    })

    this.customerService.findByUsername(this.token.getUser().username).subscribe(next => {
      this.customer = next;
      console.log(next)
    })
  }

  confirmTicket() {
    for (let ticket of this.tickets) {
      console.log(ticket);
      this.ticketService.confirmTicket(ticket).subscribe(next => {
        this.pointService.savePoint(ticket.price, ticket.showTime.movie.name).subscribe(next => {
          console.log("Save point")
        })
        this.toast.success("Đặt vé thành công !!! - Ghế : " + ticket.chairRoom.chair.name);
      }, error => {
        this.toast.error("Đặt vé thất bại, vui lòng chọn ghế khác !!!  - Ghế : " + ticket.chairRoom.chair.name);
      });
    }
  }

}
