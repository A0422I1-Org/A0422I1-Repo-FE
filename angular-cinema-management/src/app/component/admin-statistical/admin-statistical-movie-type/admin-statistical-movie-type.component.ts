import {Component, OnInit} from '@angular/core';
import {CategoryStatistic} from "../../../model/category-statistic";
import {MovieTypeService} from "../../../service/movie-type/movie-type.service";
import Chart from 'chart.js/auto';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-admin-statistical-movie-type',
  templateUrl: './admin-statistical-movie-type.component.html',
  styleUrls: ['./admin-statistical-movie-type.component.css']
})
export class AdminStatisticalMovieTypeComponent implements OnInit {
  categoryStatisticList: CategoryStatistic[] = [];
  categoryStatisticListNonGroup: CategoryStatistic[] = [];

  xValues: string[] = [];
  yValues: number[] = [];
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
  currentPage = 1;
  isDetailSelected: boolean = false;
  categoryChart: Chart;

  constructor(private movieTypeService: MovieTypeService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getCategoryStatisticListDetail();
    this.showListNonGroupBy();
    this.createChart();
  }

  showDetailList() {
    this.isDetailSelected = true;

    if (this.categoryStatisticList.length == 0){
      this.toastr.error('Bảng dữ liệu chi tiết hiển thị thất bại!');
    }else {
      this.toastr.success('Bảng dữ liệu chi tiết hiển thị thành công!');
    }
  }

  hideDetailList() {
    this.isDetailSelected = false;

    if (this.categoryStatisticListNonGroup.length == 0){
      this.toastr.error('Bảng dữ liệu hiển thị thất bại!');
    }else {
      this.toastr.success('Bảng dữ liệu hiển thị thành công!');
    }

  }



  createChart() {

    if (this.categoryChart) {
      this.categoryChart.destroy();
    }
    this.categoryChart = new Chart("categoryChart", {
      type: "bar",
      data: {
        labels: this.xValues = this.categoryStatisticListNonGroup.map((item) => item.movieType),
        datasets: [{
          backgroundColor: this.barColors,
          borderColor: this.borderColor,
          borderWidth: 2,
          data: this.yValues = this.categoryStatisticListNonGroup.map((item) => item.totalTicketsSold),
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
    this.movieTypeService.statisticCategoryMovieNonGroupBy().toPromise().then((apiList: CategoryStatistic[]) => {
      const result = apiList.reduce((acc, curr) => {
        const found = acc.find((item) => item.movieType === curr.movieType);
        if (found) {
          found.totalTicketsSold += curr.totalTicketsSold;
          found.totalRevenue += curr.totalRevenue;
        } else {
          acc.push(curr);
        }
        return acc;
      }, []);
      this.categoryStatisticListNonGroup = result;
      this.categoryStatisticListNonGroup = result.sort((a, b) => b.totalRevenue - a.totalRevenue).slice(0,10);


      if (this.categoryStatisticListNonGroup.length == 0){
        this.toastr.error('Bảng dữ liệu hiển thị thất bại!');
      }else {
        this.toastr.success('Bảng dữ liệu hiển thị thành công!');
      }


      // Gọi hàm createChart sau khi dữ liệu đã được lấy xong , nếu lấy dữ liệu thất bại thì hiển thị không thành công
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

  getCategoryStatisticListDetail() {
    this.movieTypeService.statisticCategoryMovie().subscribe(list => {
      this.categoryStatisticList = list;
      this.categoryStatisticList = list.sort((a, b) => b.totalRevenue - a.totalRevenue);
    })
  }

}
