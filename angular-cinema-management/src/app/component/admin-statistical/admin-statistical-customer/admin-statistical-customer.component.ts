import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../../service/customer/customer.service";
import {CustomerStatistic} from "../../../model/CustomerStatistic";
import Chart from "chart.js/auto";

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
  pageNumber = 0;
  totalPages = 0;
  totalElements = 0;
  statusSort = "desc"

  customerChart: Chart;
  barColors: string[] = [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    "#67d44c",
    '#4a185e',
    '#a82aa2',
    '#d4206b',
    'rgb(153, 102, 255)',];
  borderColor: [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)'
  ]

  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.getCustomerStatisticList(this.pageNumber, "", this.statusSort);
  }

  getInfoCustomer(customer: CustomerStatistic) {
    this.infoCustomer = customer;
    this.customerService.getRankCustomer(customer.id).subscribe(data => {
      this.rank = data;
    })

  }

  getCustomerStatisticList(page: number, customerName: string, statusSort: string) {
    this.customerService.getCustomerStatisticListDTO(page, customerName, statusSort).subscribe(list => {
      this.customerStatisticList = list.content;

      this.pageNumber = list.number;
      this.indexPagination = list.number;
      this.totalPages = list.totalPages;
      this.totalElements = list.totalElements;
      this.createChart();
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

  createChart() {
    if (this.customerChart != undefined) {
      this.customerChart.destroy();
    }
    this.customerChart = new Chart("customerChart", {
      type: "bar",
      data: {
        labels: this.customerStatisticList.map((item) => item.fullName),
        datasets: [{
          backgroundColor: this.barColors,
          borderColor: this.borderColor,
          borderWidth: 2,
          data: this.customerStatisticList.map((item) => item.ticket),
          label: ''
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
          }
        },
        scales: { //Title Configuration
          y: {
            display: true,
            title: {
              display: true,
              text: 'Số vé đã mua',
              color: '#F26c38',
              font: {
                family: 'tahoma',
                size: 20,
                style: 'normal',
                lineHeight: 1.0
              },
            }
          }
        }
      }
    });
  }
}
