import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../../service/customer/customer.service";
import {CustomerStatistic} from "../../../model/CustomerStatistic";

@Component({
  selector: 'app-admin-statistical-customer',
  templateUrl: './admin-statistical-customer.component.html',
  styleUrls: ['./admin-statistical-customer.component.css']
})
export class AdminStatisticalCustomerComponent implements OnInit {
  customerStatisticList: CustomerStatistic[] = [];
  checkSort = false;

  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.getCustomerStatisticList();
  }

  getCustomerStatisticList() {
    this.customerService.getCustomerStatisticListDTO().subscribe(list => {
      this.customerStatisticList = list;
      console.log(list);
    })
  }

  getCustomerStatisticListAcs() {
    this.customerService.getCustomerStatisticListDTOAcs().subscribe(list => {
      this.customerStatisticList = list;
    })
  }

  sortCustomerByTicket() {
    if (this.checkSort == true) {
      this.checkSort = false;
      this.getCustomerStatisticList()
      return;
    } else if (this.checkSort == false) {
      this.checkSort = true;
      this.getCustomerStatisticListAcs()
      return;
    }
  }
  searchCustomerStatisticByName(nameCustomer: string) {
    this.customerService.searchCustomerStatisticListByName(nameCustomer).subscribe(list => {
      this.customerStatisticList = list;
    })
  }
}
