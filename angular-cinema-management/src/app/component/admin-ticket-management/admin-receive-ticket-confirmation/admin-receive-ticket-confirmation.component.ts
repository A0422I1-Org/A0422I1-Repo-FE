import { Component, OnInit } from '@angular/core';
import {TicketService} from "../../../service/ticket/ticket.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TicketDTO} from "../dto/ticket-dto";

@Component({
  selector: 'app-admin-receive-ticket-confirmation',
  templateUrl: './admin-receive-ticket-confirmation.component.html',
  styleUrls: ['./admin-receive-ticket-confirmation.component.css']
})
export class AdminReceiveTicketConfirmationComponent implements OnInit {
  ticket:TicketDTO={
    id:'',
    customerId:'',
    fullName:'',
    cardId:'',
    phoneNumber:'',
    nameMovie:'',
    screen:'',
    startDate:'',
    startTime:'',
    endTime:'',
    nameChair:'',
    room:'',
    price:0,
    email:'',
    image:'',
    bookDateTime:''
  };
  constructor(private ticketService:TicketService,
              private activatedRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.informationTicket();
  }
  informationTicket(){
    this.activatedRoute.paramMap.subscribe(next=>{
      const id=next.get('id')
      if(id!=null){
        this.ticketService.getTicket(id).subscribe(next=>{
          this.ticket=next;
        })
      }
    })
  }

  goBack() {
    this.router.navigate(['ticket_management/select_ticket_user']);
  }
}
