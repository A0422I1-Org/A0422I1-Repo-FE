import { Component, OnInit } from '@angular/core';
import {TicketDTO} from "../dto/ticket-dto";
import {TicketService} from "../../../service/ticket/ticket.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-receive-ticket-detail',
  templateUrl: './admin-receive-ticket-detail.component.html',
  styleUrls: ['./admin-receive-ticket-detail.component.css']
})
export class AdminReceiveTicketDetailComponent implements OnInit {
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
    nameChair:'',
    price:0,
    email:'',
    image:''
  };
  constructor(private ticketService:TicketService,
              private activatedRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.detailTicket();
  }
  detailTicket(){
    this.activatedRoute.paramMap.subscribe(next=>{
      const id=next.get('id')
      if(id!=null){
        this.ticketService.getTicket(id).subscribe(next=>{
            this.ticket=next;
        })
      }
    })
  }
  getId(id: string) {
    if(id!=null){
      this.ticketService.getTicket(id).subscribe(next=>{
        this.ticket=next;
        console.log(this.ticket)
      })
    }
  }

  goBack() {
      this.router.navigate(['ticket_management/select_ticket_user']);
  }
}
