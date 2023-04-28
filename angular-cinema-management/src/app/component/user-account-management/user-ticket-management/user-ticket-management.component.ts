import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../../service/customer/customer.service";
import {Ticket} from "../../../model/ticket";
import {PointService} from "../../../service/point/point.service";

@Component({
  selector: 'app-user-ticket-management',
  templateUrl: './user-ticket-management.component.html',
  styleUrls: ['./user-ticket-management.component.css']
})
export class UserTicketManagementComponent implements OnInit {
  ticketList: Ticket[] = []
  indexPagination = 0;
  totalPages = 0;
  totalPoint: number;
  totalElements = 0;
  errMessage: string;
  validatePage: string;

  constructor(private customerService: CustomerService, private pointService: PointService) {


  }

  getSumTotalPointByCustomer() {
    this.pointService.getSumPointByCustomer().subscribe(value => {
      this.totalPoint = value;
    }, error => {
      this.totalPoint = null;
      this.errMessage = "Không có dữ liệu";
    })
  }

  ngOnInit(): void {
    this.getAllTicketByCustomer(this.indexPagination);
    this.getSumTotalPointByCustomer()
  }

  getAllTicketByCustomer(page: number) {
    this.validatePage = ""
    this.customerService.getAllTicketByCustomer(page).subscribe(value => {
      this.ticketList = value.content;
      this.indexPagination = value.number;
      console.log(this.indexPagination);
      this.totalPages = value.totalPages;
      console.log(this.totalPages);
      this.totalElements = value.totalElements;
      console.log(this.totalElements);
    }, error => {
      this.ticketList = [];
      this.errMessage = "Không có dữ liệu"
    })
  }

  getPageChoice(page) {
    if (this.validPage(page)) {
      this.getAllTicketByCustomer(page);
    }
  }

  validPage(page: number) {
    if (page >= this.totalPages || page < 0) {
      (document.getElementById("input-page-choice") as HTMLInputElement).value = "";
      this.validatePage = "Trang nhập vào phải nằm trong khoảng từ trang  1 đến trang " + this.totalPages;
      return false;
    }
    if (isNaN(Number(page))) {
      (document.getElementById("input-page-choice") as HTMLInputElement).value = "";
      this.validatePage = "Số trang nhập vào không được chứ kí tự"
      return false;
    }
    this.validatePage = ""
    return true;
  }


}
