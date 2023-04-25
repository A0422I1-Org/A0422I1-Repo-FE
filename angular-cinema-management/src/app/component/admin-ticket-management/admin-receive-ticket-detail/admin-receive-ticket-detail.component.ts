import { Component, OnInit } from '@angular/core';
import {TicketDTO} from "../dto/ticket-dto";
import {TicketService} from "../../../service/ticket/ticket.service";
import {ActivatedRoute, Router} from "@angular/router";
import jsPDF from 'jspdf';

@Component({
  selector: 'app-admin-receive-ticket-detail',
  templateUrl: './admin-receive-ticket-detail.component.html',
  styleUrls: ['./admin-receive-ticket-detail.component.css']
})
export class AdminReceiveTicketDetailComponent implements OnInit {
  pdfData:any;
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
    this.detailTicket();
  }
  detailTicket(){
    this.activatedRoute.paramMap.subscribe(next=>{
      const id=next.get('id')
      if(id!=null){
        this.ticketService.getTicket(id).subscribe(next=>{
            this.ticket=next;
          console.log(this.ticket)
        })
      }
    })
  }
  // getId(id: string) {
  //   if(id!=null){
  //     this.ticketService.getTicket(id).subscribe(next=>{
  //       this.ticket=next;
  //       console.log(this.ticket)
  //     })
  //   }
  // }

  goBack() {
      this.router.navigate(['ticket_management/select_ticket_user']);
  }

  confirmTicket(id:string) {
    // Chuỗi ngày tháng trong định dạng ISO 8601
    const isoDate = this.ticket.bookDateTime;

    // Chuyển đổi sang đối tượng Date
    const date = new Date(isoDate);

    // Lấy ngày, tháng, năm từ đối tượng Date
    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
    const year = date.getFullYear();

    // Tạo chuỗi ngày tháng mới
    const newDate = day.toString().padStart(2, '0') + '-' + month.toString().padStart(2, '0') + '-' + year.toString();


    // tạo một đối tượng jsPDF mới
    const pdf = new jsPDF('p', 'mm', 'a7');
      pdf.setFontSize(8);
    // tạo một đối tượng Object để xuất ra PDF
    const myObject = {
      NameMovie:this.ticket.nameMovie,
      DATE:newDate,
      StartTime:this.ticket.startTime+'-',
      EndTime:this.ticket.endTime,
      RoomNumer:this.ticket.room,
      Chair:this.ticket.nameChair,
      TicketPrice:this.ticket.price,
      Total:this.ticket.price
    };

    // lặp qua các thuộc tính của Object và thêm chúng vào tài liệu PDF
    let i = 0;
    for (const prop in myObject) {
      if (myObject.hasOwnProperty(prop)) {
        pdf.text(`${prop}: ${myObject[prop]}`, 5, (i + 1) * 10);
        i++;
      }
    }

    // lưu tệp PDF
    pdf.save('Mẫu PDF.pdf');
    this.router.navigate(['ticket_management/confirmTicket',id]);
    this.ticketService.deleteTicketById(id).subscribe(next=>{
    },error => {

    },()=>{
    })
  }
}
