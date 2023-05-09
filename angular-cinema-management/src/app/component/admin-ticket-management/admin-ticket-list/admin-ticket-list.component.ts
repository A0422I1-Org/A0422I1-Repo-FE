import { Component, OnInit } from '@angular/core';
import {TicketService} from "../../../service/ticket/ticket.service";
import {Ticket} from "../../../model/ticket";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TicketDTO} from "../dto/ticket-dto";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {SecurityService} from "../../../service/security/security.service";
import {OauthService} from "../../../service/google-login/oauth.service";
import has = Reflect.has;


@Component({
  selector: 'app-admin-ticket-list',
  templateUrl: './admin-ticket-list.component.html',
  styleUrls: ['./admin-ticket-list.component.css']
})
export class AdminTicketListComponent implements OnInit {
  isLoggedIn: boolean;
  hasLoggedIn: boolean;
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
    endTime:'',
    nameChair:'',
    room:'',
    price:0,
    email:'',
    image:'',
    bookDateTime:''
  };
  indexPagination = 0;
  totalPages = 0;
  totalElements = 0;
  formSearch: FormGroup;
  constructor(private ticketService:TicketService,
              private activatedRoute:ActivatedRoute,
              private router:Router,
              private toastrService:ToastrService,
              private securityService: SecurityService,
              private oauthService: OauthService,) {
    this.formSearch = new FormGroup({
    name: new FormControl("",[Validators.maxLength(20)])

  });
    this.isLoggedIn = this.securityService.isLoggedIn;
    this.hasLoggedIn = this.oauthService.  hasLoggedIn;
    if (this.isLoggedIn === false || this.hasLoggedIn === false) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.getAllTicket(this.indexPagination)
  }
  getAllTicket(page){
    this.ticketService.getAllTicket(this.formSearch.value.name,page).subscribe( next =>{
      if(next===null){
        this.toastrService.error("Từ khoá tìm kiếm không chính xác hoặc không tìm đúng trường.");
      }
      else {
        this.tickets = next.content;
        console.log(next);
        this.indexPagination = next.number;
        this.totalPages = next.totalPages;
        this.totalElements = next.totalElements;
      }
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
      this.toastrService.error(`Trang chỉ nên trong khoảng từ 1 đến ${this.totalPages}.`);
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
      document.getElementById("deleteModal").click();
      this.toastrService.success('Xóa hợp ticket thành công.', 'Thông báo');
      if (this.tickets.length === 1) {
       this.getAllTicket(this.indexPagination-1)

      }
      else {
        this.getAllTicket(this.indexPagination)
      }
    },error => {

    },()=>{
    })
  }

  nextPage(id:string) {
  this.router.navigate(['ticket_management/detailTicket',id]);
  }
}
