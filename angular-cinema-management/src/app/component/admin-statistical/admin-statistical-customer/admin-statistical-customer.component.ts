import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../../service/customer/customer.service";
import {CustomerStatistic} from "../../../model/CustomerStatistic";


@Component({
  selector: 'app-admin-statistical-customer',
  templateUrl: './admin-statistical-customer.component.html',
  styleUrls: ['./admin-statistical-customer.component.css']
})
export class AdminStatisticalCustomerComponent implements OnInit {
  infoCustomer: CustomerStatistic;
  rank: number;
  customerStatisticList: CustomerStatistic[] = [];
  indexPagination = 0;
  totalPages = 0;
  totalElements = 0;
  statusSort = "desc"

  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.getCustomerStatisticList(this.indexPagination, "", this.statusSort);
  }

  getInfoCustomer(customer: CustomerStatistic) {
    this.infoCustomer = customer;
    this.customerService.getRankCustomer(customer.id).subscribe(data => {
      this.rank = data;
    })

  }

  getCustomerStatisticList(page: number, movieName: string, statusSort: string) {
    this.customerService.getCustomerStatisticListDTO(page, movieName, statusSort).subscribe(list => {
      this.customerStatisticList = list.content;
      this.indexPagination = list.number;
      this.totalPages = list.totalPages;
      this.totalElements = list.totalElements;
    })
  }

  sortCustomerByTicket(page: number, movieName: string, statusSort: string) {

    if (movieName != "" && statusSort == 'desc') {
      this.statusSort = 'acs'
      return this.getCustomerStatisticList(page, movieName, this.statusSort);
    } else if (movieName != "" && statusSort == 'acs') {
      this.statusSort = 'desc'
      return this.getCustomerStatisticList(page, movieName, this.statusSort);
    }

    if (statusSort == 'desc') {
      this.statusSort = 'acs'
      return this.getCustomerStatisticList(page, movieName, this.statusSort);
    } else if (statusSort == 'acs') {
      this.statusSort = 'desc'
      return this.getCustomerStatisticList(page, movieName, this.statusSort);
    }
  }

  getPageChoice(page, movieName: string) {
    if (this.validPage(page)) {
      this.getCustomerStatisticList(page, movieName, "");
    }
  }

  validPage(page: number) {
    if (page >= this.totalPages || page < 0) {
      (document.getElementById("input-page-choice") as HTMLInputElement).value = "";
      return false;
    }
    if (isNaN(Number(page))) {
      (document.getElementById("input-page-choice") as HTMLInputElement).value = "";
    }
    return true;
  }
}
