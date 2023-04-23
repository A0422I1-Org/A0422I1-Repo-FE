import { Component, OnInit } from '@angular/core';
import {TicketService} from "../../../service/ticket/ticket.service";
import {Ticket} from "../../../model/ticket";
import {FormControl, FormGroup} from "@angular/forms";
import {TicketDTO} from "../dto/ticket-dto";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-admin-ticket-list',
  templateUrl: './admin-ticket-list.component.html',
  styleUrls: ['./admin-ticket-list.component.css']
})
export class AdminTicketListComponent implements OnInit {
  tickets:Ticket[]=[];
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
  indexPagination = 0;
  totalPages = 0;
  totalElements = 0;
  formSearch: FormGroup;
  constructor(private ticketService:TicketService,
              private activatedRoute:ActivatedRoute,
              private router:Router) {
    this.formSearch = new FormGroup({
    name: new FormControl("")
  });}

  ngOnInit(): void {

    this.getAllTicket(this.indexPagination)
  }
  getAllTicket(page){
    this.ticketService.getAllTicket(this.formSearch.value.name,page).subscribe( next =>{
      console.log(this.formSearch.value.name);
      this.tickets = next.content;
      console.log(next);
      this.indexPagination= next.number;
      this.totalPages = next.totalPages;
      this.totalElements = next.totalElements;
    },error=>{

    },()=>{

    })
  }
  getPageChoice(page) {
    if (this.validPage(page)) {
      this.getAllTicket(page);
    }
  }
  validPage(page: number) {
    if (page >= this.totalPages || page < 0) {
      // this.message="Trang chỉ nên trong khoảng từ 1 đến " + this.totalPages+".";
      // document.getElementById("button-notification").click();
      (document.getElementById("input-page-choice") as HTMLInputElement).value = "";
      return false;
    }
    if (isNaN(Number(page))) {
      (document.getElementById("input-page-choice") as HTMLInputElement).value = "";
    }
    return true;
  }

  getId(id: string) {
    if(id!=null){
      this.ticketService.getTicket(id).subscribe(next=>{
        this.ticket=next;
        console.log(this.ticket)
      })
    }
  }

  delete(id: string) {
    this.ticketService.deleteTicketById(id).subscribe(next=>{
      console.log(next)
      if (this.tickets.length === 0) {
        this.indexPagination -= 1;
      }
      document.getElementById("deleteModal").click();
    },error => {

    },()=>{
      this.ngOnInit();
    })
  }

  nextPage(id:string) {
  this.router.navigate(['ticket_management/bookingConfirmation',id]);
  }
}
