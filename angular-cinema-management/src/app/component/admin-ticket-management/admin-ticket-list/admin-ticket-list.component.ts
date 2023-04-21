import { Component, OnInit } from '@angular/core';
import {TicketService} from "../../../service/ticket/ticket.service";
import {Ticket} from "../../../model/ticket";

@Component({
  selector: 'app-admin-ticket-list',
  templateUrl: './admin-ticket-list.component.html',
  styleUrls: ['./admin-ticket-list.component.css']
})
export class AdminTicketListComponent implements OnInit {
  tickets:Ticket[]=[];
  indexPagination = 0;
  totalPages = 0;
  totalElements = 0;
  nameSearch = '';
  constructor(private ticketService:TicketService) { }

  ngOnInit(): void {
    this.getAllTicket(this.nameSearch,this.indexPagination)
  }
  getAllTicket(nameSearch:string,page:number){
    this.ticketService.getAllTicket(nameSearch,page).subscribe( next =>{
      console.log(next);
      this.tickets = next.content;
      console.log(this.tickets);
      this.indexPagination= next.number;
      console.log(this.indexPagination);
      this.totalPages = next.totalPages;
      console.log(this.totalPages);
      this.totalElements = next.totalElements;
      console.log(this.totalElements);
    },error=>{

    },()=>{

    })
  }
  getPageChoice(page) {
    if (this.validPage(page)) {
      this.getAllTicket(this.nameSearch, page);

      // this.getAll(this.areaSearch,this.stageSearch,this.statusSearch,this.typeSearch,page);
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
}
