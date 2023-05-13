import { Component, OnInit } from '@angular/core';
import {TicketService} from "../../../service/ticket/ticket.service";
import {Ticket} from "../../../model/ticket";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TicketDTO} from "../dto/ticket-dto";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {SecurityService} from "../../../service/security/security.service";
import {OauthService} from "../../../service/google-login/oauth.service";
import jsPDF from "jspdf";


@Component({
  selector: 'app-admin-ticket-list',
  templateUrl: './admin-ticket-list.component.html',
  styleUrls: ['./admin-ticket-list.component.css']
})
export class AdminTicketListComponent implements OnInit {
  isChecked :boolean []= [];
  showButton = false;
  isLoggedIn: boolean;
  hasLoggedIn: boolean;
  ticketDto:TicketDTO[]=[];
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
    name: new FormControl("",[Validators.maxLength(20), Validators.pattern("^[A-Za-z0-9 úùụũủịỉìỉĩâăôđêọòóõỏáàảãạèéẹẽẻưửữựừứốồổộỗếềểễệấầẫẩậặắẳẵằạáàảã" +
      "ÚÙỤŨỦỊỈÌỈĨÂĂÔĐÊỌÒÓÕỎÁÀẢÃẠÈÉẸẼẺƯỬỮỰỪỨỐỒỔỘỖẾỀỂỄỆẤẦẪẨẬẶẮẲẴẰẠÁÀẢÃ-]+$")])

  });
    this.isLoggedIn = this.securityService.isLoggedIn;
    this.hasLoggedIn = this.oauthService.  hasLoggedIn;
    if (this.isLoggedIn === false || this.hasLoggedIn === false) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.showButton=false;
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
      this.toastrService.success('Xóa ticket thành công.', 'Thông báo');
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
 // pipe date
  getDate(a):string{
    // Chuỗi ngày tháng trong định dạng ISO 8601
    const isoDate = a;

    // Chuyển đổi sang đối tượng Date
    const date = new Date(isoDate);

    // Lấy ngày, tháng, năm từ đối tượng Date
    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
    const year = date.getFullYear();

    // Tạo chuỗi ngày tháng mới
    const newDate = day.toString().padStart(2, '0') + '-' + month.toString().padStart(2, '0') + '-' + year.toString();
    return newDate;
  }
  movieTheater() {
    for (let i = 0; i <this.ticketDto.length ; i++) {
      const pdf = new jsPDF('p', 'mm', 'a7');
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "bold");
      pdf.text("THE VAO",30,15);
      pdf.text("PHONG CHIEU PHIM ",21,20);
      pdf.setFontSize(7);
      pdf.text("AO4CINEMA DA NANG",5,30);
      pdf.setFont("helvetica", "normal");
      pdf.text("TANG 6 CODEGYM DA NANG ,254 NGUYEN",5,35);
      pdf.text("VAN LINH Q .SON TRA,TP. DA NANG",5,40);
      pdf.text("=======================================",5,45);
      pdf.setFont("helvetica", "bold");
      pdf.text(this.ticketDto[i].nameMovie, 5, 50);
      pdf.setFont("helvetica", "normal");
      pdf.text(this.getDate(this.ticketDto[i].bookDateTime)+"          "+`${this.ticketDto[i].startTime}`+'-'+`${this.ticketDto[i].endTime}`, 5, 55);
      pdf.setFont("helvetica", "bold");
      pdf.text(`${this.ticketDto[i].room}`+"       "+`${this.ticketDto[i].nameChair}`, 5, 60);
      pdf.setFont("helvetica", "normal");
      pdf.text("=======================================",5,65);
      const formattedNumber = this.ticketDto[i].price.toLocaleString('vi-VN');
      pdf.text("- Gia ve            "+formattedNumber+"     VND",5,70);
      pdf.text("----------------------------------------------------------------------",4,75);
      pdf.setFont("helvetica", "bold");
      pdf.text("                                               Tong   VND  "+formattedNumber,5,82);

      // lưu tệp PDF
      pdf.save(`${this.ticketDto[i].fullName}.pdf`);
      this.ticketService.deleteTicketById(this.ticketDto[i].id).subscribe(next=>{
      },error => {

      },()=>{
        this.ngOnInit();
      })
    }
  }
  onCheckboxChange(index:string) {
    if(index!=null) {
      this.ticketService.getTicket(index).subscribe(next => {
        this.ticketDto.push(next);
      })
    }
    this.isChecked[index] = !this.isChecked[index];

    // Kiểm tra giá trị của isChecked để xác định xem có bật nút button hay không
    this.showButton = this.isChecked.some((isChecked) => isChecked);
  }
}
