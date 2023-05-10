import { Component, OnInit } from '@angular/core';
import {Customer} from "../../../model/customer";
import {CustomerService} from "../../../service/customer/customer.service";

@Component({
  selector: 'app-admin-customer-list',
  templateUrl: './admin-customer-list.component.html',
  styleUrls: ['./admin-customer-list.component.css']
})
export class AdminCustomerListComponent implements OnInit {
  customers: Customer[] = [];
  totalPages: number;
  activePage: number = 0;
  totalElements: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  size: number;
  search: string = "";
  pageArray: number[];

  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.getCustomer(this.search, this.activePage);
  }

  getCustomer(search: string, page: number) {
    this.customerService.getCustomer(search, page).subscribe(next => {
      console.log(next);
      this.customers = next.content;
      this.totalElements = next.totalElements;
      this.first = next.first;
      this.last = next.last;
      this.size = next.size;

      if (page == undefined) {
        this.activePage = 0;
      } else {
        this.activePage = next.number;
      }

      this.totalPages = next.totalPages;
      this.numberOfElements = next.numberOfElements;

      this.pageArray = []
      for (let i = 0; i < this.totalPages; i++) {
        this.pageArray.push(i);
      }
    }, error => {
      console.log('error')
      console.log(error)
    }, () => {
      console.log('a')
    });
  }
}
