import { Component, OnInit } from '@angular/core';
import {ShowtimeStatistic} from "../../../model/showtime-statistic";
import {ShowtimeService} from "../../../service/showtime/showtime.service";
import Chart, {registerables} from 'chart.js/auto';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-admin-statistical-showtime',
  templateUrl: './admin-statistical-showtime.component.html',
  styleUrls: ['./admin-statistical-showtime.component.css']
})
export class AdminStatisticalShowtimeComponent implements OnInit {
  showtimeStatisticList: ShowtimeStatistic[] = [];
  showtimeStatisticListNonGroup: ShowtimeStatistic[] = [];

  xValues: string[] = [];
  yValues: number[] = [];

  currentPage = 1;
  isDetailSelected: boolean = false;
  categoryChart: Chart;

  constructor(private showtimeService: ShowtimeService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getShowtimeStatisticDetailList();
    this.showListNonGroupBy();
    this.createChart();

  }

  showDetailList(){
    this.isDetailSelected = true;

    if (this.showtimeStatisticList.length == 0){
      this.toastr.error('Bảng dữ liệu chi tiết hiển thị thất bại!');
    }else {
      this.toastr.success('Bảng dữ liệu chi tiết hiển thị thành công!');
    }
  }
  hideDetailList(){
    this.isDetailSelected = false;


    if (this.showtimeStatisticListNonGroup.length == 0){
      this.toastr.error('Bảng dữ liệu hiển thị thất bại!');
    }else {
      this.toastr.success('Bảng dữ liệu hiển thị thành công!');
    }
  }

  createChart() {
    if (this.categoryChart) {
      this.categoryChart.destroy();
    }
    this.categoryChart = new Chart("showtimeChart", {
      type: "line",
      data: {
        labels: this.xValues = this.showtimeStatisticListNonGroup.map((item) => item.startTime),
        datasets: [{
          backgroundColor: 'transparent',
          borderColor: '#F26b38',
          borderWidth: 4,
          pointBackgroundColor: '#F26b38',
          data: this.yValues = this.showtimeStatisticListNonGroup.map((item) => item.soldTickets),
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
        scales: {
          y: {
            display: true,
            title: {
              display: true,
              text: 'Số vé đã bán',
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

  showListNonGroupBy() {
    this.showtimeService.statisticShowtimeMovieNonGroupBy().toPromise().then((apiList: ShowtimeStatistic[]) => {
      const result = apiList.reduce((acc, curr) => {
        const found = acc.find((item) => item.startTime === curr.startTime);
        if (found) {
          found.soldTickets += curr.soldTickets;
          found.totalRevenue += curr.totalRevenue;
        } else {
          acc.push(curr);
        }
        return acc;
      }, []);
      this.showtimeStatisticListNonGroup = result;
      this.showtimeStatisticListNonGroup = result.sort((a, b) => b.totalRevenue - a.totalRevenue).slice(0,10);



      if (this.showtimeStatisticListNonGroup.length == 0){
        this.toastr.error('Bảng dữ liệu hiển thị thất bại!');
      }else {
        this.toastr.success('Bảng dữ liệu hiển thị thành công!');
      }

      // Gọi hàm createChart sau khi dữ liệu đã được lấy xong
      this.createChart();
      if (this.xValues.length == 0 || this.yValues.length == 0) {
        this.toastr.error('Biểu đồ hiển thị thất bại!');
      } else {
        this.toastr.success('Biểu đồ hiển thị thành công!');
      }
    }).catch((error) => {
      console.log(error);
    });
  }


  getShowtimeStatisticDetailList() {
    this.showtimeService.statisticShowtimeMovie().subscribe(list => {
      this.showtimeStatisticList = list;

    })
  }





}
