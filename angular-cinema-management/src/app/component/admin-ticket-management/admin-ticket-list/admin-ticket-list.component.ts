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
import { saveAs } from 'file-saver';
import * as JSZip from "jszip";
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
  pageNumber = 0;
  countPage=3;
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
    this.hasLoggedIn = this.oauthService.hasLoggedIn;
    if (this.isLoggedIn === false || this.hasLoggedIn === false) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.showButton=false;
    this.ticketDto=[];
    this.getAllTicket(this.pageNumber)
  }
  getAllTicket(page){
    this.ticketService.getAllTicket(this.formSearch.value.name,page).subscribe( next =>{
      if(next===null){
        this.tickets=[];
        this.totalElements=0;
        this.toastrService.error("Từ khoá tìm kiếm không chính xác hoặc không tìm đúng trường.");
      }
      else {
        this.tickets = next.content;
        this.pageNumber = next.number;
        this.totalPages = next.totalPages;
        this.totalElements = next.totalElements;
        if( this.totalElements > 3){
          this.countPage = 3;
        } else {
          this.countPage = Math.min(this.countPage, this.totalElements);
        }
        console.log("test",this.countPage)
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
      document.getElementById("XoaModal1").click();
      this.toastrService.success('Xóa ticket thành công.', 'Thông báo');
      if (this.tickets.length === 1) {
       this.getAllTicket(this.pageNumber-1)

      }
      else {
        this.getAllTicket(this.pageNumber)
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
    const zip = new JSZip();
    const name=this.ticketDto[0].fullName;
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
      // pdf.save(`${this.ticketDto[i].fullName}.pdf`);
      const pdfBlob=pdf.output('blob')
      zip.file(`file ${i}.pdf`,pdfBlob);
      this.ticketService.updateTicketById(this.ticketDto[i].id).subscribe(next=>{
        this.ticketDto[i]=null;
        this.ngOnInit();
      },error => {

      },()=>{
      })
    }
    zip.generateAsync({type:'blob'}).then((zipBlob)=> {
      // lưu file zip
      saveAs(zipBlob,`${name}.zip`);
    })
    for (let i = 0; i <this.isChecked.length ; i++) {
      this.isChecked[i]=false;
    }
    document.getElementById("confirmModal").click();
    document.getElementById("XoaModal2").click();
  }
  onCheckboxChange(index:string) {
    let check = false;
    let char="";
    if(index!=null) {
      this.ticketService.getTicket(index).subscribe(next => {
        if(this.ticketDto.some(obj=>obj.id===next.id)){
          check = true;
          char = next.id;
        }
        if(check){
          this.ticketDto = this.ticketDto.filter(item=>item.id !==next.id);
          console.log(this.ticketDto  )
        }
        else {
          this.ticketDto.push(next);
        }
      })
    }

    this.isChecked[index] = !this.isChecked[index];

    // Kiểm tra giá trị của isChecked để xác định xem có bật nút button hay không
    this.showButton = this.isChecked.some((isChecked) => isChecked);
  }
}
