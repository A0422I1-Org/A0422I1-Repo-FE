import { Component, OnInit } from '@angular/core';
import {ShowtimeStatistic} from "../../../model/showtime-statistic";
import {ShowtimeService} from "../../../service/showtime/showtime.service";
import Chart, {registerables} from 'chart.js/auto';

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

  constructor(private showtimeService: ShowtimeService) {
  }

  ngOnInit(): void {
    this.getShowtimeStatisticDetailList();
    this.showListNonGroupBy();
    this.createChart();

  }

  showDetailList(){
    this.isDetailSelected = true;
  }
  hideDetailList(){
    this.isDetailSelected = false;
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
      this.showtimeStatisticListNonGroup = result.sort((a, b) => b.totalRevenue - a.totalRevenue);
      console.log("Mảng đã group by : ");
      console.log(result);
      // Gọi hàm createChart sau khi dữ liệu đã được lấy xong
      this.createChart();

    }).catch((error) => {
      console.log(error);
    });
  }


  getShowtimeStatisticDetailList() {
    this.showtimeService.statisticShowtimeMovie().subscribe(list => {
      this.showtimeStatisticList = list;
      console.log("Mảng suất chiếu chi tiết : ");
      console.log(this.showtimeStatisticList);
    })
  }





}
