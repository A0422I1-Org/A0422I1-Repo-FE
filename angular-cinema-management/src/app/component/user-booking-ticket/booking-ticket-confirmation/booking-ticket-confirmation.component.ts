import {Component, OnInit} from '@angular/core';
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
  checkTickets: boolean = true;

  constructor(private ticketService: TicketService,
              private customerService: CustomerService,
              private toast: ToastrService,
              private router: Router,
              private token: TokenStorageService,
              private security: SecurityService) {
  }

  ngOnInit(): void {
    this.ticketService.getListSeatChoosing.subscribe(next => {
      this.tickets = next;
      console.log("test thu: " + this.tickets)
      for (let ticket of this.tickets) {
        this.totalMoney = this.totalMoney + ticket.price;
      }
      this.ticketDefault = this.tickets[0];

    })
    console.log("tong tien " + this.totalMoney);

    console.log("Chuong test: " + this.tickets[0].customer)
    console.log("Chuong test: " + this.tickets[0].chairRoom.id)
    console.log("Chuong test: " + this.tickets[0].id)
    console.log("Chuong test: " + this.tickets[0].showTime)
    console.log("Chuong test: " + this.tickets[0].book_datetime)
    console.log("Chuong test: " + this.tickets[0].isDelete)
    console.log("Chuong test: " + this.tickets[0].price)
    console.log("Chuong test: " + this.tickets[0].status)
    console.log("Chuong test: " + this.ticketDefault.showTime.isDelete)
    console.log("Chuong test: " + this.ticketDefault.showTime.movie)
    console.log("Chuong test: " + this.ticketDefault.showTime.startTime)
    console.log("Chuong test: " + this.ticketDefault.showTime.id)
    console.log("Chuong test: " + this.ticketDefault.id)
    console.log("Chuong test: " + this.ticketDefault.chairRoom)
    console.log("Chuong test: " + this.ticketDefault.customer)
    this.customerService.findByUsername(this.token.getUser().username).subscribe(next => {
      this.customer = next;
      console.log(next)
    })
    this.addTicketCheckList();
  }

  showDetailAndPaymentPage() {
    this.toast.success("Đã xác nhận thông tin. Vui lòng thanh toán để hoàn tất quá trình đặt vé !")
    this.router.navigateByUrl("/user/payment-ticket");
  }

  addTicketCheckList() {
    for (let ticket of this.tickets) {
      this.ticketService.addTicketCheckList(ticket.id).subscribe(next => {

      }, error => {
        this.checkTickets = false;
      });
    }
  }

  checkTicket() {
    if (this.checkTickets == true) {
      this.showDetailAndPaymentPage();
    }
    else {
      this.toast.error("Đã có người đặt, vui lòng chọn vé khác !!!")
    }
  }


  goBack() {
    this.ticketService.clearTicketCheckList().subscribe(next => {
    })
    this.router.navigateByUrl("booking/select-seat?showTimeId=" + this.ticketDefault.showTime.id);
  }
}
